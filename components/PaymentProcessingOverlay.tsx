"use client";

import { useCurrency } from "@/context/CurrencyContext";

type CardProps = {
  title?: string;
  subtitle?: string;
  amountLabel?: string;
  amount?: number;
};

export function PaymentProcessingCard({
  title = "Connecting to payment gateway…",
  subtitle = "Please do not close this tab",
  amountLabel,
  amount,
}: CardProps) {
  const { formatCurrency } = useCurrency();
  return (
    <div
      className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center text-center">
        <div className="spinner" aria-hidden />
        <h2 className="mt-6 text-lg font-semibold text-text">{title}</h2>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        {amountLabel != null && amount != null && (
          <p className="mt-4 font-mono text-gold">
            {amountLabel}: {formatCurrency(amount)}
          </p>
        )}
      </div>
    </div>
  );
}

type OverlayProps = CardProps & {
  isOpen: boolean;
};

export default function PaymentProcessingOverlay({
  isOpen,
  ...cardProps
}: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <PaymentProcessingCard {...cardProps} />
    </div>
  );
}
