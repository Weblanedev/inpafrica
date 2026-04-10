"use client";

import Link from "next/link";
import AffiliateCTA from "@/components/AffiliateCTA";
import { useCurrency } from "@/context/CurrencyContext";
import {
  AFFILIATE_PRO_ANNUAL_XAF,
  AFFILIATE_STARTER_ANNUAL_XAF,
} from "@/lib/pricing";
import { useAuth } from "@/context/AuthContext";
import {
  canUseAffiliateProgram,
  canUseVendorProgram,
} from "@/lib/memberPricingClient";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

export default function AffiliatePage() {
  const { user, loading } = useAuth();
  const { formatCurrency } = useCurrency();

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-br from-bg via-surface to-bg py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-3xl font-bold text-text sm:text-4xl md:text-5xl">
            Turn Your Audience Into Income
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-text">
            {AFFILIATE_TAGLINE}
          </p>
          <p className="mt-6 text-lg text-muted">
            Share INP Africa with entrepreneurs and marketers. Earn commissions
            on every book sold through your link, built for French and English
            speakers across Africa.
          </p>
        </div>
      </section>

      {!loading && !user && (
        <section className="border-b border-border bg-surface2 py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold">
              Step details
            </p>
            <h2 className="mt-3 font-display text-center text-2xl font-bold text-text md:text-3xl">
              How to become an affiliate
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
              You need a free INP Africa account before you can pay for
              affiliate membership. Same idea as leading marketplaces: register
              first, then subscribe to unlock your dashboard and referral links.
            </p>
            <ol className="mt-10 space-y-5 text-left text-muted">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  1
                </span>
                <span className="min-w-0">
                  <strong className="text-text">Create your account.</strong>{" "}
                  Registration is free. You must be signed in before you can pay
                  for Starter or Pro.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  2
                </span>
                <span className="min-w-0">
                  <strong className="text-text">
                    Choose a plan &amp; pay.
                  </strong>{" "}
                  Annual membership in XAF (
                  {formatCurrency(AFFILIATE_STARTER_ANNUAL_XAF)} or{" "}
                  {formatCurrency(AFFILIATE_PRO_ANNUAL_XAF)} per year). That unlocks
                  your affiliate tools; book prices on the store stay separate.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  3
                </span>
                <span className="min-w-0">
                  <strong className="text-text">Promote with your link.</strong>{" "}
                  Share your unique URL on social, email, or WhatsApp.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  4
                </span>
                <span className="min-w-0">
                  <strong className="text-text">Get paid.</strong> Add payout
                  details in your dashboard. Commissions are paid on a schedule
                  once you reach the withdrawal threshold.
                </span>
              </li>
            </ol>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-gold px-8 py-3 font-semibold text-white hover:bg-gold-light"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-border px-8 py-3 font-semibold text-text hover:border-gold"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>
      )}

      {!loading && user && canUseAffiliateProgram(user) && (
        <section className="border-b border-border bg-surface py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-2xl font-bold text-text md:text-3xl">
              Affiliate workspace
            </h2>
            <p className="mt-3 text-sm text-muted">
              Signed in as{" "}
              <strong className="text-text">@{user.username}</strong>. Promote
              books and courses with your referral links; commissions track here
              (simulated). Plan:{" "}
              <strong className="text-text">{user.plan}</strong>.
            </p>
            <AffiliateCTA />
          </div>
        </section>
      )}

      {!loading && user && canUseVendorProgram(user) && (
        <section className="border-b border-border bg-surface2 py-10 md:py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm text-muted">
              You&apos;re logged in as a{" "}
              <strong className="text-text">vendor member</strong>. Affiliate
              promos and links are on this page for affiliates only.{" "}
              <Link href="/vendor" className="text-gold hover:underline">
                Open vendor hub
              </Link>{" "}
              to list products and wholesale pricing.
            </p>
          </div>
        </section>
      )}

      {!loading &&
        user &&
        !canUseAffiliateProgram(user) &&
        !canUseVendorProgram(user) && (
          <section className="border-b border-border bg-surface py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
              <h2 className="font-display text-xl font-bold text-text md:text-2xl">
                Become an affiliate
              </h2>
              <p className="mt-3 text-sm text-muted">
                You&apos;re signed in as{" "}
                <strong className="text-text">@{user.username}</strong>.
                Register as an affiliate and complete membership payment to
                unlock referral links, course tools, and member book prices.{" "}
                <Link href="/register" className="text-gold hover:underline">
                  Register as affiliate
                </Link>
              </p>
            </div>
          </section>
        )}

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Affiliate membership
        </h2>
        <div className="mt-8 space-y-5 text-muted leading-relaxed">
          <p>
            Becoming an INP Africa affiliate means joining a program built for
            real budgets: our digital books are priced in{" "}
            <strong className="text-text">hundreds and thousands of XAF</strong>
            , not millions. Your membership is a modest{" "}
            <strong className="text-text">annual fee</strong> that unlocks your
            dashboard, referral links, and commission tracking, separate from
            what customers pay for books.
          </p>
          <p>
            <strong className="text-text">Starter</strong> (
            {formatCurrency(AFFILIATE_STARTER_ANNUAL_XAF)} per year) is ideal if you
            are testing the waters: you get the tools to share links, earn 10%
            on sales, and a starter pack of free e-books so you can speak from
            experience.
          </p>
          <p>
            <strong className="text-text">Pro</strong> (
            {formatCurrency(AFFILIATE_PRO_ANNUAL_XAF)} per year) is for affiliates
            who want to scale: higher commission rate (20%), member pricing on
            all books for your own learning, priority support, and access to
            course materials when we run live sessions, plus our monthly
            strategy newsletter.
          </p>
          <p>
            Both tiers renew once per year. There are no hidden “million-XAF”
            charges: what you see below is what you pay for membership. Book
            purchases remain simple, transparent prices on the store.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="font-display text-center text-3xl font-bold text-text md:text-4xl">
          How It Works
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {[
            {
              step: "1",
              title: "Register & choose a plan",
              body: "Create your INP Africa account and select Starter or Pro annual membership.",
            },
            {
              step: "2",
              title: "Share your link",
              body: "Post your unique affiliate link on social, email, or WhatsApp.",
            },
            {
              step: "3",
              title: "Earn commissions",
              body: "Get paid when your referrals purchase books. Track everything in your dashboard.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-border bg-surface p-10 text-center shadow-sm"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-xl text-text">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-center text-3xl font-bold text-text md:text-4xl">
            Choose your plan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Annual membership in XAF. Book prices on the marketplace stay in the
            hundreds and thousands. Membership only covers your affiliate access
            and perks.
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="rounded-2xl border border-border bg-bg p-6 shadow-sm sm:p-10">
              <h3 className="font-display text-2xl text-text">Starter</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-muted">
                Best for new promoters
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-gold">
                {formatCurrency(AFFILIATE_STARTER_ANNUAL_XAF)}{" "}
                <span className="text-base font-normal text-muted">
                  per year
                </span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li>Affiliate dashboard &amp; unique referral links</li>
                <li>10% commission on qualifying book sales</li>
                <li>5 free digital books from our catalogue</li>
                <li>Email support (48h response target)</li>
                <li>Monthly tips email for affiliates</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-gold bg-surface2 p-6 shadow-lg sm:p-10">
              <h3 className="font-display text-2xl text-text">Pro</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-muted">
                For serious partners
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold text-gold">
                {formatCurrency(AFFILIATE_PRO_ANNUAL_XAF)}{" "}
                <span className="text-base font-normal text-muted">
                  per year
                </span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li>Everything in Starter</li>
                <li>20% commission on qualifying book sales</li>
                <li>All catalogue books at member prices for you</li>
                <li>Priority support + early access to new titles</li>
                {/* <li>Courses &amp; live sessions when scheduled</li> */}
                <li>Monthly strategy newsletter with creatives &amp; angles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold text-text md:text-3xl">
            Ready to earn?
          </h2>
          {!loading && !user && <AffiliateCTA />}
          {!loading && user && canUseAffiliateProgram(user) && (
            <p className="mt-6 text-sm text-muted">
              Use the affiliate workspace section above for your tools and plan.
            </p>
          )}
          {!loading && user && canUseVendorProgram(user) && (
            <p className="mt-6 text-sm text-muted">
              You have a vendor account. Affiliate promos stay on this page for
              affiliate members; your listings are under{" "}
              <Link href="/vendor" className="text-gold hover:underline">
                Become a Vendor
              </Link>
              .
            </p>
          )}
          {!loading &&
            user &&
            !canUseAffiliateProgram(user) &&
            !canUseVendorProgram(user) && (
              <div className="mt-6">
                <AffiliateCTA />
              </div>
            )}
          <p className="mt-8 text-sm text-muted">
            Questions?{" "}
            <Link href="/contact" className="text-gold hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
