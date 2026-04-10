import type { Metadata } from "next";

const desc =
  "Review your cart and checkout digital books from INP Africa with secure payment.";

export const metadata: Metadata = {
  title: "Cart",
  description: desc,
  alternates: { canonical: "/cart" },
  openGraph: {
    title: "Shopping cart | INP Africa",
    description: desc,
    url: "/cart",
  },
  twitter: {
    title: "Shopping cart | INP Africa",
    description: desc,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
