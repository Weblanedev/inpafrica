import type { Metadata } from "next";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

const desc = `List your ebooks on INP Africa and reach buyers across Africa. ${AFFILIATE_TAGLINE}`;

export const metadata: Metadata = {
  title: "Become a Vendor",
  description: desc,
  alternates: { canonical: "/vendor" },
  openGraph: {
    title: "Become a Vendor | INP Africa",
    description: desc,
    url: "/vendor",
  },
  twitter: {
    title: "Become a Vendor | INP Africa",
    description: desc,
  },
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
