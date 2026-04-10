import type { Metadata } from "next";

const desc =
  "Complete your affiliate or vendor membership payment to activate your INP Africa account.";

export const metadata: Metadata = {
  title: "Membership payment",
  description: desc,
  alternates: { canonical: "/register/membership-pay" },
  openGraph: {
    title: "Membership payment | INP Africa",
    description: desc,
    url: "/register/membership-pay",
  },
  twitter: {
    title: "Membership payment | INP Africa",
    description: desc,
  },
};

export default function MembershipPayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
