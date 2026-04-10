import type { Metadata } from "next";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

const desc = `Earn commissions as an INP Africa affiliate. ${AFFILIATE_TAGLINE}`;

export const metadata: Metadata = {
  title: "Become an Affiliate",
  description: desc,
  alternates: { canonical: "/affiliate" },
  openGraph: {
    title: "Become an Affiliate | INP Africa",
    description: desc,
    url: "/affiliate",
  },
  twitter: {
    title: "Become an Affiliate | INP Africa",
    description: desc,
  },
};

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
