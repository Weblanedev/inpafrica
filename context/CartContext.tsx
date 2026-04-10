"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Book } from "@/data/books";

export interface CartItem {
  book: Book;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: (useMemberPrice?: boolean) => number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const STORAGE_KEY = "bookstem_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        /* ignore */
      }
      setHydrated(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addToCart = (book: Book) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.book.slug === book.slug);
      if (existing) {
        return prev.map((i) =>
          i.book.slug === book.slug ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { book, qty: 1 }];
    });
  };

  const removeFromCart = (slug: string) =>
    setItems((prev) => prev.filter((i) => i.book.slug !== slug));

  const updateQty = (slug: string, qty: number) => {
    if (qty <= 0) return removeFromCart(slug);
    setItems((prev) =>
      prev.map((i) => (i.book.slug === slug ? { ...i, qty } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const totalPrice = (useMemberPrice = false) =>
    items.reduce(
      (s, i) =>
        s +
        (useMemberPrice ? i.book.memberPrice : i.book.price) * i.qty,
      0,
    );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
