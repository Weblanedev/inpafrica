"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_CURRENCY,
  type AppCurrency,
  formatCurrencyAmount,
  isAppCurrency,
} from "@/lib/currency";

const STORAGE_KEY = "inpafrica_currency";

interface CurrencyContextType {
  currency: AppCurrency;
  setCurrency: (c: AppCurrency) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>(
  {} as CurrencyContextType,
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<AppCurrency>(DEFAULT_CURRENCY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && isAppCurrency(raw)) {
        setCurrencyState(raw);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setCurrency = useCallback((c: AppCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const formatCurrency = useCallback(
    (amount: number) => formatCurrencyAmount(amount, currency),
    [currency],
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
