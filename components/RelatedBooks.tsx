"use client";

import type { Book } from "@/data/books";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { canViewMemberBookPrice } from "@/lib/memberPricingClient";

export default function RelatedBooks({ books: list }: { books: Book[] }) {
  const { user } = useAuth();
  const showMember = canViewMemberBookPrice(user);
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((b) => (
        <ProductCard key={b.slug} book={b} showMemberPrice={showMember} />
      ))}
    </div>
  );
}
