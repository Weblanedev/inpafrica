import type { Metadata } from "next";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

const desc = `Browse business, marketing, and affiliate ebooks in XAF. ${AFFILIATE_TAGLINE}`;

export const metadata: Metadata = {
  title: "Shop",
  description: desc,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Shop digital books | INP Africa",
    description: desc,
    url: "/products",
  },
  twitter: {
    title: "Shop digital books | INP Africa",
    description: desc,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
