"use client";

import Link from "next/link";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-text">
              INP Africa
            </p>
            <p className="mt-2 text-sm text-muted">
              Business and affiliate marketing books for entrepreneurs.{" "}
              {AFFILIATE_TAGLINE}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text">
              Programs
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/affiliate" className="hover:text-gold">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link href="/vendor" className="hover:text-gold">
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text">
              Terms of Service
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/privacy-policy" className="hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-gold">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="mt-12 border-t border-border pt-8 text-center text-xs text-muted"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} INP Africa · All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
