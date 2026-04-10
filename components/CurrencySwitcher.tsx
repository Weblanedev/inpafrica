"use client";

import {
  CURRENCY_LABELS,
  SUPPORTED_CURRENCIES,
  type AppCurrency,
} from "@/lib/currency";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        id="nav-currency"
        value={currency}
        aria-label="Display currency"
        onChange={(e) => setCurrency(e.target.value as AppCurrency)}
        className="w-auto min-w-[3.25rem] cursor-pointer rounded-lg border border-border bg-surface px-2 py-1.5 text-xs font-medium text-text shadow-sm transition hover:border-gold focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
      >
        {SUPPORTED_CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {CURRENCY_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
