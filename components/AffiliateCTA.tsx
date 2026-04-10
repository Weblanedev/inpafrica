"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { canUseAffiliateProgram } from "@/lib/memberPricingClient";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

export default function AffiliateCTA() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mt-8 flex justify-center gap-4">
        <div className="h-12 w-32 animate-pulse rounded-lg bg-border" />
        <div className="h-12 w-32 animate-pulse rounded-lg bg-border" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-8">
        <p className="mx-auto mb-6 max-w-lg text-center text-sm leading-relaxed text-muted">
          {AFFILIATE_TAGLINE}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/register"
          className="rounded-lg border border-gold px-8 py-3 font-semibold text-gold hover:bg-gold/10"
        >
          Join as Starter
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-gold px-8 py-3 font-semibold text-white hover:bg-gold-light"
        >
          Join as Pro
        </Link>
        </div>
      </div>
    );
  }

  if (canUseAffiliateProgram(user)) {
    return (
      <p className="mt-8 rounded-xl border border-border bg-surface p-6 text-sm text-muted">
        Referral links, course teasers, and commission reports will appear here
        after we connect the live dashboard. You&apos;re on plan{" "}
        <strong className="text-text">{user.plan}</strong>.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <p className="mx-auto mb-6 max-w-lg text-center text-sm leading-relaxed text-muted">
        {AFFILIATE_TAGLINE}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
      <Link
        href="/register"
        className="rounded-lg border border-gold px-8 py-3 font-semibold text-gold hover:bg-gold/10"
      >
        Register as affiliate
      </Link>
      <Link
        href="/login"
        className="rounded-lg bg-gold px-8 py-3 font-semibold text-white hover:bg-gold-light"
      >
        Log in
      </Link>
      </div>
    </div>
  );
}
