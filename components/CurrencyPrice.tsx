"use client";

import { useCurrency } from "@/context/CurrencyContext";

/** Use in server-rendered pages so amounts follow the nav currency selection. */
export function CurrencyPrice({ amount }: { amount: number }) {
  const { formatCurrency } = useCurrency();
  return <>{formatCurrency(amount)}</>;
}
