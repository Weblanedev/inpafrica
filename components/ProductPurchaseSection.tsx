"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Book } from "@/data/books";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatThousands } from "@/lib/formatXaf";
import { useCurrency } from "@/context/CurrencyContext";
import { canViewMemberBookPrice } from "@/lib/memberPricingClient";

const categoryHeading: Record<Book["category"], string> = {
  affiliate: "Affiliate Marketing",
  business: "Business",
  marketing: "Marketing",
  mindset: "Mindset",
};

export default function ProductPurchaseSection({ book }: { book: Book }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { formatCurrency } = useCurrency();
  const [added, setAdded] = useState(false);
  const memberDeal = canViewMemberBookPrice(user);

  const handleAdd = () => {
    addToCart(book);
    toast.success(`Added “${book.title}” to cart`);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div>
      <span className="inline-block rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal">
        {categoryHeading[book.category]}
      </span>
      <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-text md:text-4xl">
        {book.title}
      </h1>
      <p className="mt-2 text-lg text-muted">{book.author}</p>

      <div className="mt-8 rounded-xl border border-border bg-surface2 p-6">
        {memberDeal ? (
          <div>
            <p className="text-sm text-muted">Member price (affiliate/vendor)</p>
            <p className="font-mono text-3xl font-bold text-gold">
              {formatCurrency(book.memberPrice)}
            </p>
            <p className="mt-1 font-mono text-sm text-muted line-through">
              {formatCurrency(book.price)}
            </p>
          </div>
        ) : (
          <div>
            <p className="font-mono text-3xl font-bold text-text">
              {formatCurrency(book.price)}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
              {user ? (
                <>
                  Paid affiliate or vendor members pay less.{" "}
                  <Link href="/register" className="text-gold hover:underline">
                    Upgrade via membership
                  </Link>
                  .
                </>
              ) : (
                <>
                  <span aria-hidden>🔓</span>
                  <Link href="/login" className="text-gold hover:underline">
                    Log in
                  </Link>
                  <span>Paid affiliate or vendor members get lower prices.</span>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <p className="mt-8 leading-relaxed text-muted">{book.description}</p>

      <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted">
        <span>
          <strong className="text-text">{formatThousands(book.pages)}</strong>{" "}
          pages
        </span>
        <span>·</span>
        <span>
          {book.rating.toFixed(1)}★ ({formatThousands(book.reviews)} reviews)
        </span>
        <span>·</span>
        <span>
          Format: <strong className="text-text">{book.format}</strong>
        </span>
        <span>·</span>
        <span>
          Category:{" "}
          <strong className="text-text capitalize">{book.category}</strong>
        </span>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-10 w-full rounded-lg bg-btn py-4 text-center font-semibold text-white transition hover:bg-btn-hover disabled:opacity-80"
        disabled={added}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button>

      <Link
        href="/products"
        className="mt-6 inline-block text-sm text-gold hover:underline"
      >
        ← Back to Products
      </Link>
    </div>
  );
}
