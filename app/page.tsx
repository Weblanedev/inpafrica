import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import NewsletterCTA from "@/components/NewsletterCTA";
import { CurrencyPrice } from "@/components/CurrencyPrice";
import {
  AFFILIATE_PRO_ANNUAL_XAF,
  AFFILIATE_STARTER_ANNUAL_XAF,
} from "@/lib/pricing";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";
import {
  BROWSER_TAB_TITLE,
  DEFAULT_DESCRIPTION,
  OG_SHARE_TITLE,
  SITE_NAME,
  getSiteUrl,
} from "@/lib/siteMetadata";

/**
 * Long `<title>` for the tab. Share preview title/description here; images come from
 * `app/opengraph-image.jpg` + `app/twitter-image.jpg` (Next convention, Digitstem-style layout).
 */
export const metadata: Metadata = {
  title: { absolute: BROWSER_TAB_TITLE },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: OG_SHARE_TITLE,
    description: AFFILIATE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: OG_SHARE_TITLE,
    description: AFFILIATE_TAGLINE,
  },
};

export default function Home() {
  return (
    <>
      {/* Hero: full-bleed image carousel background */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <HeroCarousel />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0d0d1a]/82 via-[#0d0d1a]/68 to-[#0a0a12]/88"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-35"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(245, 166, 35, 0.2) 0%, transparent 45%),
              radial-gradient(circle at 80% 70%, rgba(45, 212, 191, 0.12) 0%, transparent 40%)
            `,
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-lg text-[#c8c8dc] drop-shadow-sm">
              Your Gateway to
            </p>
            <h1 className="font-display mt-2 text-4xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
              Financial Freedom
            </h1>
            <p className="text-shimmer font-display mt-2 text-3xl font-semibold drop-shadow-md sm:text-4xl lg:text-5xl">
              Through Knowledge
            </p>
            <p className="mt-6 max-w-xl text-lg text-[#c8c8dc] drop-shadow">
              Discover business and affiliate marketing books trusted by
              entrepreneurs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-lg bg-[#f5a623] px-5 py-3 text-center text-sm font-semibold text-[#0d0d1a] shadow-lg transition hover:bg-[#ffc85a] sm:flex-initial sm:px-6 sm:text-base"
              >
                Browse Books →
              </Link>
              <Link
                href="/affiliate"
                className="inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-lg border border-white/40 bg-[#0d0d1a]/25 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#f5a623] hover:text-[#f5a623] sm:flex-initial sm:px-6 sm:text-base"
              >
                Become an Affiliate
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {[
                "📚 Become a vendor",
                "👥 Affiliate Membership",
                "⭐ Unlock Your Earning Potential",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-[#0d0d1a]/45 px-4 py-2 text-sm text-[#e8e8f0] backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learn, Sell, Earn (replaces former products-on-home slot) */}
      <section className="relative overflow-hidden border-t border-border bg-[#f9f9f9] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="order-2 max-w-xl lg:order-1">
            <p className="max-w-xl text-base font-medium leading-relaxed text-text sm:text-lg">
              {AFFILIATE_TAGLINE}
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex rounded-full bg-btn px-10 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-btn-hover"
            >
              Get Started
            </Link>

            <div className="relative mt-14 space-y-5">
              <div className="max-w-sm rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Account growth
                </p>
                <div className="mt-3 h-24 rounded-lg bg-gradient-to-t from-surface2 to-white" />
                <p className="mt-2 text-xs text-muted">Jan to May trend</p>
              </div>
              <div className="max-w-[220px] rounded-2xl border border-border bg-white p-4 shadow-md">
                <p className="text-xs text-muted">Monthly reach</p>
                <p className="font-mono text-xl font-bold text-text">1k+</p>
                <p className="text-xs text-success">+4.6% growth</p>
              </div>
            </div>
          </div>

          <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-[480px]">
            <div className="relative mx-auto max-w-lg lg:ml-auto">
              <p className="mb-4 text-balance text-right font-display text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
                Learn, Sell, &amp; Earn
              </p>
              <div className="relative aspect-[4/5] w-full max-w-md min-w-0 overflow-hidden rounded-3xl bg-surface2 shadow-xl lg:ml-auto">
                <Image
                  src="/images/hero-home.png"
                  alt="Professional using a tablet"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
              <p className="mt-6 text-right text-lg font-medium text-text md:text-xl">
                Making Your Profit Our Priority
              </p>
              <svg
                className="absolute -left-4 top-24 hidden h-24 w-24 text-gold lg:block"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden
              >
                <path
                  d="M10 10 C 40 40, 60 20, 80 50 S 90 90, 50 95"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute bottom-4 left-4 right-4 max-w-2xl rounded-full bg-text px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-white shadow-lg sm:bottom-8 sm:left-auto sm:right-0 sm:max-w-none sm:text-xs">
                #1 Best marketing hub
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-center text-3xl font-bold text-text md:text-4xl">
            Why INP Africa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            {AFFILIATE_TAGLINE} Digital books, fair XAF pricing, and a network
            built for entrepreneurs across the continent.
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              {
                icon: "📖",
                title: "Curated for African Markets",
                body: "Practical titles for real constraints: payments, trust, and growth.",
              },
              {
                icon: "💰",
                title: "Member pricing",
                body: "Registered members unlock better prices on every digital book.",
              },
              {
                icon: "🤝",
                title: "Earn as you share",
                body: `${AFFILIATE_TAGLINE} Earn commissions when readers buy through your links.`,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-surface p-10 text-center shadow-sm"
              >
                <span className="text-4xl">{f.icon}</span>
                <h3 className="mt-6 font-display text-xl font-semibold text-text">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-center text-3xl font-bold text-text md:text-4xl">
            Become an Affiliate &amp; Earn More
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            {AFFILIATE_TAGLINE} Simple annual membership in XAF. Book prices
            stay in the hundreds and thousands. Pick Starter to begin or Pro for
            higher commissions and full member pricing on books.
          </p>
            <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="rounded-2xl border border-border bg-bg p-6 shadow-sm sm:p-10">
              <h3 className="font-display text-2xl text-text">Starter</h3>
              <p className="mt-3 font-mono text-2xl font-semibold text-gold">
                <CurrencyPrice amount={AFFILIATE_STARTER_ANNUAL_XAF} />{" "}
                <span className="text-base font-normal text-muted">
                  per year
                </span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li>Affiliate dashboard &amp; referral links</li>
                <li>10% commission on book sales</li>
                <li>5 free digital books</li>
                <li>Email support</li>
              </ul>
              <Link
                href="/register"
                className="mt-10 block w-full rounded-xl border-2 border-gold py-3.5 text-center font-semibold text-gold transition hover:bg-gold/10"
              >
                Get Starter Plan
              </Link>
            </div>
            <div className="rounded-2xl border-2 border-gold bg-surface2 p-6 shadow-lg sm:p-10">
              <h3 className="font-display text-2xl text-text">Pro</h3>
              <p className="mt-3 font-mono text-2xl font-semibold text-gold">
                <CurrencyPrice amount={AFFILIATE_PRO_ANNUAL_XAF} />{" "}
                <span className="text-base font-normal text-muted">
                  per year
                </span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li>Everything in Starter</li>
                <li>20% commission on referrals</li>
                <li>All books at member prices</li>
                <li>Priority support + courses access</li>
                <li>Monthly strategy newsletter</li>
              </ul>
              <Link
                href="/register"
                className="mt-10 block w-full rounded-xl bg-gold py-3.5 text-center font-semibold text-white transition hover:bg-gold-light"
              >
                Get Pro Plan
              </Link>
            </div>
          </div>
          <p className="mt-12 text-center text-sm text-muted">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-medium text-gold hover:underline"
            >
              Log in to your account
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-bg py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-center text-3xl font-bold text-text md:text-4xl">
            Go Beyond Books: Courses
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Deep-dive programs to complement your library. Enrolment links to
            our affiliate hub for now.
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12">
            {[
              {
                title: "Affiliate Marketing Masterclass",
                price: 3500,
                img: "https://placehold.co/600x340/e2e5ec/64748b?text=Masterclass",
              },
              {
                title: "6-Figure Digital Business Blueprint",
                price: 5000,
                img: "https://placehold.co/600x340/e2e5ec/64748b?text=Blueprint",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              >
                <div className="relative aspect-[600/340] w-full bg-surface2">
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-semibold text-text">
                    {c.title}
                  </h3>
                  <p className="mt-3 font-mono text-lg font-semibold text-gold">
                    <CurrencyPrice amount={c.price} />
                  </p>
                  <Link
                    href="/affiliate"
                    className="mt-6 inline-flex rounded-lg bg-btn px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-btn-hover"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
