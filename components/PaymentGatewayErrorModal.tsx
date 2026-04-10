"use client";

import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  homeHref?: string;
  shopHref?: string;
};

export default function PaymentGatewayErrorModal({
  isOpen,
  onClose,
  title = "Payment Gateway Unavailable",
  message = "We encountered a temporary issue processing your payment. Don't worry: your cart has been saved and your items are waiting for you.",
  homeHref = "/",
  shopHref = "/products",
}: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-error-title"
      >
        <button
          type="button"
          className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:bg-surface2 hover:text-text"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger/15 text-2xl text-danger"
            aria-hidden
          >
            ✕
          </div>
          <h2
            id="payment-error-title"
            className="mt-4 text-xl font-semibold text-text"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{message}</p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              className="rounded-lg bg-btn px-6 py-3 text-sm font-semibold text-white hover:bg-btn-hover"
              onClick={() => {
                onClose();
                router.push(homeHref);
              }}
            >
              Take me to home
            </button>
            <button
              type="button"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text hover:border-gold"
              onClick={() => {
                onClose();
                router.push(shopHref);
              }}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
