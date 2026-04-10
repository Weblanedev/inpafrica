import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";
import JsonLd from "@/components/JsonLd";
import { rootMetadata } from "@/lib/siteMetadata";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body text-text antialiased">
        <JsonLd />
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ToastHost />
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
