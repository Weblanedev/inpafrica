import type { Metadata } from "next";

const desc = "Log in to your INP Africa account to shop, manage affiliates, or vendor tools.";

export const metadata: Metadata = {
  title: "Log in",
  description: desc,
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Log in | INP Africa",
    description: desc,
    url: "/login",
  },
  twitter: {
    title: "Log in | INP Africa",
    description: desc,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
