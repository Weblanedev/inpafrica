import type { Metadata } from "next";

const desc =
  "Create your INP Africa account to buy books, join as an affiliate, or become a vendor.";

export const metadata: Metadata = {
  title: "Register",
  description: desc,
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Create account | INP Africa",
    description: desc,
    url: "/register",
  },
  twitter: {
    title: "Create account | INP Africa",
    description: desc,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
