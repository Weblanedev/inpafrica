import type { Metadata } from "next";
import Link from "next/link";
import FaqIllustration from "@/components/FaqIllustration";
import FaqList from "@/components/FaqList";

const faqDesc =
  "What is INP Africa, how delivery works, and how vendor and affiliate commissions are shared.";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqDesc,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | INP Africa",
    description: faqDesc,
    url: "/faq",
  },
  twitter: {
    title: "FAQ | INP Africa",
    description: faqDesc,
  },
};

export default function FaqPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-gold/[0.07] via-bg to-surface2">
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:py-24">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold">
            Help
          </p>
          <h1 className="font-display mt-3 text-center text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
            See some of the questions people are asking.
          </p>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="flex justify-center lg:justify-start lg:pt-4">
              <FaqIllustration size="hero" />
            </div>
            <div className="min-w-0">
              <FaqList variant="page" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-sm text-muted">
          <span>Still stuck?</span>
          <Link href="/contact" className="font-medium text-gold hover:underline">
            Contact us
          </Link>
          <span aria-hidden className="text-border">
            ·
          </span>
          <Link href="/affiliate" className="font-medium text-gold hover:underline">
            Affiliate program
          </Link>
          <span aria-hidden className="text-border">
            ·
          </span>
          <Link href="/vendor" className="font-medium text-gold hover:underline">
            Vendor program
          </Link>
        </p>
      </div>
    </div>
  );
}
