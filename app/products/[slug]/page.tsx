import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { books, getBookBySlug, getRelatedBooks } from "@/data/books";
import ProductPurchaseSection from "@/components/ProductPurchaseSection";
import RelatedBooks from "@/components/RelatedBooks";
import { SITE_NAME } from "@/lib/siteMetadata";

function truncateMeta(text: string, max = 160): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) {
    return { title: "Book not found" };
  }
  const description = truncateMeta(book.description);
  const ogTitle = `${book.title} | ${SITE_NAME}`;
  return {
    title: book.title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `/products/${slug}`,
      type: "website",
      images: [
        {
          url: book.coverUrl,
          width: 300,
          height: 420,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [book.coverUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();
  const related = getRelatedBooks(book, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-2">
          <div className="relative mx-auto aspect-[3/4] max-w-[300px] overflow-hidden rounded-xl border border-border bg-surface2">
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="300px"
              priority
              unoptimized
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="rounded-full bg-surface2 px-3 py-1 text-xs font-medium text-teal">
              {book.format}
            </span>
          </div>
        </div>
        <div className="lg:col-span-3">
          <ProductPurchaseSection book={book} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-border pt-16 md:mt-32 md:pt-24">
          <h2 className="font-display text-2xl font-bold text-text md:text-3xl">
            You May Also Like
          </h2>
          <RelatedBooks books={related} />
        </section>
      )}
    </div>
  );
}
