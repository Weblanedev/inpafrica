"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { fetchTryGateway } from "@/lib/paymentGatewayClient";
import PaymentGatewayErrorModal from "@/components/PaymentGatewayErrorModal";
import { PaymentProcessingCard } from "@/components/PaymentProcessingOverlay";

type Phase = "processing" | "error" | "success";

export default function PaymentModal({
  isOpen,
  onClose,
  total,
}: {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}) {
  const router = useRouter();
  const { formatCurrency } = useCurrency();
  const [phase, setPhase] = useState<Phase>("processing");

  useEffect(() => {
    if (!isOpen) return;
    setPhase("processing");
    let cancelled = false;
    void (async () => {
      const r = await fetchTryGateway();
      if (cancelled) return;
      if (r.ok) setPhase("success");
      else setPhase("error");
    })();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (phase === "error") {
    return (
      <PaymentGatewayErrorModal
        isOpen
        onClose={onClose}
        message="We encountered a temporary issue processing your payment. Don't worry: your cart has been saved and your items are waiting for you."
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        {phase === "processing" && (
          <PaymentProcessingCard
            amountLabel="Total"
            amount={total}
          />
        )}
        {phase === "success" && (
          <div className="text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-2xl text-success"
              aria-hidden
            >
              ✓
            </div>
            <h2
              id="payment-modal-title"
              className="mt-4 text-xl font-semibold text-text"
            >
              Payment received
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Thank you. Your order is confirmed. You will receive a confirmation
              when your gateway is fully connected.
            </p>
            <p className="mt-2 font-mono text-gold">
              Total: {formatCurrency(total)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text hover:border-gold"
                onClick={() => {
                  onClose();
                  router.push("/products");
                }}
              >
                Continue shopping
              </button>
              <button
                type="button"
                className="rounded-lg bg-btn px-6 py-3 text-sm font-semibold text-white hover:bg-btn-hover"
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
              >
                Take me to home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
