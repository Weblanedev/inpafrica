import { formatXaf } from "@/lib/formatXaf";

/** ISO-style codes for display & future conversion */
export type AppCurrency = "XAF";

export const DEFAULT_CURRENCY: AppCurrency = "XAF";

export const SUPPORTED_CURRENCIES: readonly AppCurrency[] = ["XAF"];

export const CURRENCY_LABELS: Record<AppCurrency, string> = {
  XAF: "XAF",
};

export function isAppCurrency(value: string): value is AppCurrency {
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

/** Formats a catalog amount in the given currency (base data is XAF). */
export function formatCurrencyAmount(
  amount: number,
  code: AppCurrency,
): string {
  switch (code) {
    case "XAF":
    default:
      return formatXaf(amount);
  }
}
