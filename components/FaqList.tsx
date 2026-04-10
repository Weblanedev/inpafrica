"use client";

import { useId, useState } from "react";
import { SITE_FAQS } from "@/lib/faqContent";

type Props = {
  /** Larger type for standalone FAQ page */
  variant?: "page" | "embed";
};

export default function FaqList({ variant = "page" }: Props) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const qClass =
    variant === "page"
      ? "font-display text-base font-semibold text-text sm:text-lg"
      : "font-display text-sm font-semibold text-text sm:text-base md:text-lg";

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <dl className="space-y-4 md:space-y-5">
      {SITE_FAQS.map((f, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const labelId = `${baseId}-label-${index}`;

        return (
          <div
            key={f.q}
            className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-[box-shadow,border-color] hover:border-gold/25"
          >
            <dt>
              <button
                type="button"
                id={labelId}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface2/80 sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className={qClass}>{f.q}</span>
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-bg text-lg font-light leading-none text-muted"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </dt>
            <dd
              id={panelId}
              role="region"
              aria-labelledby={labelId}
              hidden={!isOpen}
              className={
                isOpen
                  ? "border-t border-border px-5 pb-5 pt-0 sm:px-6 sm:pb-6"
                  : undefined
              }
            >
              {isOpen && (
                <p className="pt-4 text-sm leading-relaxed text-muted">{f.a}</p>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
