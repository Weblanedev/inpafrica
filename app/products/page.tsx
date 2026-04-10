"use client";

import { useEffect, useMemo, useState } from "react";
import { books, type Book } from "@/data/books";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { canViewMemberBookPrice } from "@/lib/memberPricingClient";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

/** Matches `grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` (Tailwind default breakpoints). */
function useProductGridColumns(): 2 | 3 | 4 {
  const [columns, setColumns] = useState<2 | 3 | 4>(2);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqXl = window.matchMedia("(min-width: 1280px)");
    const update = () => {
      setColumns(mqXl.matches ? 4 : mqLg.matches ? 3 : 2);
    };
    update();
    mqLg.addEventListener("change", update);
    mqXl.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqXl.removeEventListener("change", update);
    };
  }, []);

  return columns;
}

type Cat = "all" | Book["category"];

const categories: { id: Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "affiliate", label: "Affiliate" },
  { id: "business", label: "Business" },
  { id: "marketing", label: "Marketing" },
  { id: "mindset", label: "Mindset" },
];

type SortKey = "newest" | "price-asc" | "price-desc";

export default function ProductsPage() {
  const { user } = useAuth();
  const showMember = canViewMemberBookPrice(user);
  const gridColumns = useProductGridColumns();
  /** 2 full rows per “page” (2 cols → 4, 3 → 6, 4 → 8). Lighter initial load. */
  const chunkSize = 2 * gridColumns;

  const [cat, setCat] = useState<Cat>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [visibleCount, setVisibleCount] = useState(4);

  const filtered = useMemo(() => {
    const list =
      cat === "all" ? [...books] : books.filter((b) => b.category === cat);

    list.sort((a, b) => {
      if (sort === "price-asc") {
        const pa = showMember ? a.memberPrice : a.price;
        const pb = showMember ? b.memberPrice : b.price;
        return pa - pb;
      }
      if (sort === "price-desc") {
        const pa = showMember ? a.memberPrice : a.price;
        const pb = showMember ? b.memberPrice : b.price;
        return pb - pa;
      }
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [cat, sort, showMember]);

  useEffect(() => {
    setVisibleCount(chunkSize);
  }, [cat, sort, showMember, chunkSize]);

  const visibleBooks = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const hasMore = visibleCount < filtered.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">
        Our Book Collection
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Curated business, marketing, and affiliate titles. {AFFILIATE_TAGLINE}{" "}
        Paid affiliate and vendor members unlock lower prices on every book.
      </p>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === c.id
                  ? "bg-btn text-white"
                  : "border border-border bg-surface text-muted hover:border-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="whitespace-nowrap">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-border bg-surface2 px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="newest">Newest (A-Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-20 text-center text-muted">
          No books match this filter. Try another category.
        </p>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {visibleBooks.map((book) => (
              <ProductCard
                key={book.slug}
                book={book}
                showMemberPrice={showMember}
              />
            ))}
          </div>
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((n) =>
                    Math.min(n + chunkSize, filtered.length),
                  )
                }
                className="rounded-lg border-2 border-gold bg-surface px-8 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
