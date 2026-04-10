"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { VENDOR_ANNUAL_PER_PRODUCT_XAF } from "@/lib/pricing";
import {
  canUseAffiliateProgram,
  canUseVendorProgram,
} from "@/lib/memberPricingClient";

export default function VendorPage() {
  const { user, loading } = useAuth();
  const { formatCurrency } = useCurrency();
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-br from-bg via-surface to-bg py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
            Sell Your Knowledge on INP Africa
          </h1>
          <p className="mt-6 text-lg text-muted">
            Publish digital books to a growing community of entrepreneurs.
            We handle distribution; you keep the lion&apos;s share of revenue.
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
              How to become a vendor
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
              Before you list a product, read our terms. You must own or have
              resale rights to everything you submit. We vet every product before it
              goes live, and you need a registered INP Africa account before you
              can pay the annual listing fee.
            </p>
            <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted">
              <p>
                <strong className="text-text">What we need for vetting:</strong> a
                product sales page URL, how delivery works for buyers, the
                commission you offer affiliates, and how customers can reach
                support. Send these details to our vendor inbox with the subject
                line <em>Request For New Vendor Application</em>. We&apos;ll reply
                with next steps.
              </p>
              {/* <p>
                <strong className="text-text">Fees:</strong> vendor registration is{" "}
                {formatCurrency(VENDOR_ANNUAL_PER_PRODUCT_XAF)} per product per year
                (illustrative; subject to change, non-refundable). INP Africa
                collects payments, pays affiliates, and helps with delivery. A
                platform fee applies on each sale (see guidelines when you join).
              </p> */}
              <p>
                <strong className="text-text">After approval:</strong> you&apos;ll
                receive a link to complete vendor signup and list your approved
                product. Registered members can use the application form below once
                they&apos;re logged in.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-gold px-8 py-3 font-semibold text-white hover:bg-gold-light"
              >
                Create account first
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
        <section className="border-b border-border bg-surface2 py-10 md:py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm text-muted">
              You&apos;re an <strong className="text-text">affiliate member</strong>
              . Listing and resale tools are for vendors.{" "}
              <Link href="/affiliate" className="text-gold hover:underline">
                Affiliate hub
              </Link>{" "}
              for links and commissions.
            </p>
          </div>
        </section>
      )}

      {!loading && user && canUseVendorProgram(user) && (
        <section className="border-b border-border bg-surface py-10 md:py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-xl font-bold text-text md:text-2xl">
              Vendor workspace
            </h2>
            <p className="mt-2 text-sm text-muted">
              Signed in as <strong className="text-text">@{user.username}</strong>.
              Wholesale-style member pricing applies to your purchases; submit
              products below. Email{" "}
              <a
                href="mailto:vendors@inpafrica.test"
                className="text-gold hover:underline"
              >
                vendors@inpafrica.test
              </a>{" "}
              with subject{" "}
              <strong className="text-text">Request For New Vendor Application</strong>{" "}
              for vetting.
            </p>
          </div>
        </section>
      )}

      {!loading &&
        user &&
        !canUseVendorProgram(user) &&
        !canUseAffiliateProgram(user) && (
          <section className="border-b border-border bg-surface py-10 md:py-12">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
              <p className="text-sm text-muted">
                Register as a <strong className="text-text">vendor</strong> and
                complete the listing fee to unlock vendor pricing and this
                application.{" "}
                <Link href="/register" className="text-gold hover:underline">
                  Create vendor account
                </Link>
              </p>
            </div>
          </section>
        )}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="font-display text-center text-3xl font-bold text-text">
          Benefits
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Earn up to 70% royalties",
              body: "Competitive rates on every sale of your digital titles.",
            },
            {
              title: "Full control over pricing",
              body: "Set launch promos and member prices within our guidelines.",
            },
            {
              title: "Access to our audience",
              body: "Reach readers actively investing in business education.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-surface p-8 text-center"
            >
              <h3 className="font-display text-xl text-text">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-center text-3xl font-bold text-text">
            How it works
          </h2>
          <ol className="mt-10 space-y-6 text-muted">
            <li className="flex gap-4">
              <span className="font-mono text-gold">1.</span>
              Submit your manuscript and metadata for review.
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-gold">2.</span>
              Our team checks formatting and originality.
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-gold">3.</span>
              We publish your eBook on INP Africa with your pricing.
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-gold">4.</span>
              You get monthly payouts and sales analytics.
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-text">
          Requirements
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">
          <li>Original content you own or have rights to</li>
          <li>Digital delivery (PDF or EPUB)</li>
          <li>Minimum 50 pages (or equivalent)</li>
          <li>Professional cover art (we can help with templates)</li>
        </ul>

        <h2 className="font-display mt-12 text-2xl font-bold text-text">
          Vendor application
        </h2>
        {!user && !loading && (
          <p className="mt-4 rounded-xl border border-border bg-surface2 p-4 text-sm text-muted">
            <Link href="/register" className="font-semibold text-gold hover:underline">
              Register
            </Link>{" "}
            as vendor or{" "}
            <Link href="/login" className="font-semibold text-gold hover:underline">
              log in
            </Link>
            . You will complete membership payment before receiving your access code.
          </p>
        )}
        {loading && (
          <p className="mt-6 text-sm text-muted">Loading…</p>
        )}
        {user && canUseVendorProgram(user) && sent ? (
          <p className="mt-6 rounded-xl border border-success/40 bg-success/10 p-6 text-success">
            Thanks. We received your application and will reply within 5 business
            days.
          </p>
        ) : user && canUseVendorProgram(user) ? (
          <form
            className="mt-6 space-y-4 rounded-xl border border-border bg-surface p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Application received. We’ll be in touch soon.");
            }}
          >
            <div>
              <label className="text-xs text-muted">Name *</label>
              <input
                required
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
            </div>
            <div>
              <label className="text-xs text-muted">Email *</label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
            </div>
            <div>
              <label className="text-xs text-muted">Book title *</label>
              <input
                required
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
            </div>
            <div>
              <label className="text-xs text-muted">Category *</label>
              <select
                required
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              >
                <option value="">Select…</option>
                <option value="affiliate">Affiliate</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="mindset">Mindset</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted">Brief description *</label>
              <textarea
                required
                rows={4}
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gold py-3 font-semibold text-white hover:bg-gold-light"
            >
              Submit Application
            </button>
          </form>
        ) : null}
      </section>
    </div>
  );
}
