"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import CartIcon from "@/components/CartIcon";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import Logo from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/affiliate", label: "Become an Affiliate" },
  { href: "/vendor", label: "Become a Vendor" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-full min-w-0 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <div className="shrink-0">
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                isActive(href)
                  ? "border-b-2 border-gold pb-0.5 text-gold"
                  : "text-muted"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3">
          <CurrencySwitcher />
          <CartIcon />
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="hidden rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition hover:border-gold hover:text-gold sm:inline-block"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden rounded-lg bg-btn px-4 py-2 text-sm font-semibold text-white transition hover:bg-btn-hover sm:inline-block"
              >
                Register
              </Link>
            </>
          )}
          {!loading && user && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[160px] truncate text-sm text-muted">
                Hi, @{user.username}
              </span>
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  toast.success("Signed out");
                }}
                className="rounded-lg border border-border px-3 py-2 text-sm text-text transition hover:border-gold"
              >
                Logout
              </button>
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-border p-2 md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6 text-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-2 py-2 text-sm ${
                  isActive(href) ? "bg-surface2 text-gold" : "text-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            {!loading && !user && (
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
                <Link
                  href="/login"
                  className="rounded-lg border border-border py-2 text-center text-sm text-text"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-btn py-2 text-center text-sm font-semibold text-white hover:bg-btn-hover"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
            {!loading && user && (
              <div className="mt-2 border-t border-border pt-4">
                <p className="px-2 text-sm text-muted">Hi, @{user.username}</p>
                <button
                  type="button"
                  className="mt-2 w-full rounded-lg border border-border py-2 text-sm text-text"
                  onClick={async () => {
                    setOpen(false);
                    await logout();
                    toast.success("Signed out");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
