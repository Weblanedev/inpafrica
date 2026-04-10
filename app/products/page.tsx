"use client";

import { useMemo, useState } from "react";
import { books, type Book } from "@/data/books";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { canViewMemberBookPrice } from "@/lib/memberPricingClient";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

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
  const [cat, setCat] = useState<Cat>("all");
  const [sort, setSort] = useState<SortKey>("newest");

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="font-display text-4xl font-bold text-text">
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book) => (
            <ProductCard
              key={book.slug}
              book={book}
              showMemberPrice={showMember}
            />
          ))}
        </div>
      )}
    </div>
  );
}
