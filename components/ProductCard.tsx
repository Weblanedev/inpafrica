"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Book } from "@/data/books";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

const categoryStyles: Record<Book["category"], string> = {
  affiliate: "bg-teal/15 text-teal",
  business: "bg-gold/15 text-gold",
  marketing: "bg-gold/10 text-gold",
  mindset: "bg-muted/20 text-muted",
};

export default function ProductCard({
  book,
  showMemberPrice = false,
}: {
  book: Book;
  showMemberPrice?: boolean;
}) {
  const { addToCart } = useCart();
  const { formatCurrency } = useCurrency();

  return (
    <div className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:border-gold/40 hover:shadow-md">
      <Link
        href={`/products/${book.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-surface2"
      >
        <Image
          src={book.coverUrl}
          alt={book.title}
          fill
          className="object-cover transition group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />
        {book.bestseller && (
          <span className="absolute right-2 top-2 rounded bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow">
            Bestseller
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <span
          className={`mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${categoryStyles[book.category]}`}
        >
          {book.category}
        </span>
        <Link href={`/products/${book.slug}`} className="min-w-0">
          <h3 className="font-display line-clamp-2 text-lg font-semibold leading-tight text-text transition hover:text-gold">
            {book.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted">{book.author}</p>
        <div className="mt-3 flex flex-col gap-1">
          {showMemberPrice ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-lg font-bold text-gold">
                {formatCurrency(book.memberPrice)}
              </span>
              <span className="font-mono text-sm text-muted line-through">
                {formatCurrency(book.price)}
              </span>
            </div>
          ) : (
            <span className="font-mono text-lg font-semibold text-text">
              {formatCurrency(book.price)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(book);
            toast.success(`Added “${book.title}” to cart`);
          }}
          className="mt-4 w-full rounded-lg bg-btn py-2 text-sm font-semibold text-white transition hover:bg-btn-hover"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
