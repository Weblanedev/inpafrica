"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";
import PaymentGatewayErrorModal from "@/components/PaymentGatewayErrorModal";
import PaymentProcessingOverlay from "@/components/PaymentProcessingOverlay";
import { useCurrency } from "@/context/CurrencyContext";
import { fetchTryGateway } from "@/lib/paymentGatewayClient";
import {
  AFFILIATE_PRO_ANNUAL_XAF,
  AFFILIATE_STARTER_ANNUAL_XAF,
  VENDOR_ANNUAL_PER_PRODUCT_XAF,
} from "@/lib/pricing";

const STORAGE_KEY = "inpafrica_pending_membership";

type Pending = {
  /** Current flow: signup held until payment; no user row yet */
  pendingId?: string;
  /** Older sessions: user row with membershipPending */
  userId?: string;
  accountType: "affiliate" | "vendor";
  name: string;
  email: string;
};

export default function MembershipPayPage() {
  const { formatCurrency } = useCurrency();
  const [pending, setPending] = useState<Pending | null>(null);
  const [plan, setPlan] = useState<
    "affiliate-starter" | "affiliate-pro" | "vendor"
  >("affiliate-starter");
  const [busy, setBusy] = useState(false);
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [gatewayErrorOpen, setGatewayErrorOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as Pending;
      if ((!p.pendingId && !p.userId) || !p.accountType) return;
      setPending(p);
      if (p.accountType === "vendor") {
        setPlan("vendor");
      }
    } catch {
      // ignore
    }
  }, []);

  if (!pending) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-muted">
          No pending membership.{" "}
          <Link href="/register" className="text-gold hover:underline">
            Register as affiliate or vendor
          </Link>{" "}
          first.
        </p>
      </div>
    );
  }

  const affiliate = pending.accountType === "affiliate";

  const amount =
    plan === "affiliate-starter"
      ? AFFILIATE_STARTER_ANNUAL_XAF
      : plan === "affiliate-pro"
        ? AFFILIATE_PRO_ANNUAL_XAF
        : VENDOR_ANNUAL_PER_PRODUCT_XAF;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <PaymentProcessingOverlay
        isOpen={busy}
        title="Connecting to payment gateway…"
        subtitle="Please do not close this tab"
        amountLabel="Amount"
        amount={amount}
      />
      <PaymentGatewayErrorModal
        isOpen={gatewayErrorOpen}
        onClose={() => setGatewayErrorOpen(false)}
        message="We could not complete membership payment at the moment. Please try again later, or continue browsing the store."
        homeHref="/"
        shopHref="/products"
      />

      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold text-text">
          Pay membership fee
        </h1>
        <p className="mt-3 text-center text-sm text-muted">
          Hi {pending.name}, complete payment for your{" "}
          <strong className="text-text">
            {affiliate ? "affiliate" : "vendor"}
          </strong>{" "}
          account ({pending.email}). After payment, you&apos;ll receive a
          membership access code to log in (shown below once in this demo).
        </p>

        {affiliate && (
          <div className="mt-8 space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-bg p-4">
              <input
                type="radio"
                name="plan"
                checked={plan === "affiliate-starter"}
                onChange={() => setPlan("affiliate-starter")}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-text">Starter</span>
                <span className="ml-2 font-mono text-gold">
                  {formatCurrency(AFFILIATE_STARTER_ANNUAL_XAF)}
                </span>
                <span className="text-muted"> / year</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-bg p-4">
              <input
                type="radio"
                name="plan"
                checked={plan === "affiliate-pro"}
                onChange={() => setPlan("affiliate-pro")}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-text">Pro</span>
                <span className="ml-2 font-mono text-gold">
                  {formatCurrency(AFFILIATE_PRO_ANNUAL_XAF)}
                </span>
                <span className="text-muted"> / year</span>
              </span>
            </label>
          </div>
        )}

        {!affiliate && (
          <div className="mt-8 rounded-xl border border-border bg-bg p-4">
            <p className="font-semibold text-text">Vendor listing</p>
            <p className="mt-1 font-mono text-xl text-gold">
              {formatCurrency(VENDOR_ANNUAL_PER_PRODUCT_XAF)}
              <span className="text-base font-normal text-muted">
                {" "}
                / product / year
              </span>
            </p>
          </div>
        )}

        <button
          type="button"
          disabled={busy || !!accessCode}
          onClick={async () => {
            setBusy(true);
            try {
              const gateway = await fetchTryGateway();
              if (!gateway.ok) {
                setGatewayErrorOpen(true);
                return;
              }
              const res = await fetch("/api/auth/complete-membership", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                  pending.pendingId
                    ? {
                        pendingId: pending.pendingId,
                        plan: affiliate ? plan : "vendor",
                      }
                    : {
                        userId: pending.userId,
                        plan: affiliate ? plan : "vendor",
                      },
                ),
              });
              const data = await res.json();
              if (!res.ok) {
                toast.error(data.error ?? "Could not activate membership");
                return;
              }
              sessionStorage.removeItem(STORAGE_KEY);
              setAccessCode(data.accessCode as string);
              toast.success("Membership activated");
            } finally {
              setBusy(false);
            }
          }}
          className="mt-8 w-full rounded-lg bg-gold py-3 font-semibold text-white hover:bg-gold-light disabled:opacity-60"
        >
          {busy
            ? "Processing…"
            : accessCode
              ? "Paid"
              : "Pay & activate membership"}
        </button>

        {accessCode && (
          <div
            className="mt-8 rounded-xl border border-gold/40 bg-gold/5 p-4 text-left"
            role="status"
          >
            <p className="text-sm font-semibold text-text">
              Save your member access code
            </p>
            <p className="mt-2 text-xs text-muted">
              In production we would email this to you. Use it with your email
              and password on the login page.
            </p>
            <code className="mt-3 block break-all rounded-lg bg-surface2 p-3 text-xs text-text">
              {accessCode}
            </code>
            <button
              type="button"
              className="mt-3 text-sm text-gold hover:underline"
              onClick={() => {
                void navigator.clipboard.writeText(accessCode);
                toast.success("Copied");
              }}
            >
              Copy code
            </button>
            <Link
              href="/login"
              className="mt-6 block w-full rounded-lg bg-btn py-3 text-center font-semibold text-white hover:bg-btn-hover"
            >
              Go to login
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/register" className="text-gold hover:underline">
            Back to register
          </Link>
        </p>
      </div>
    </div>
  );
}
