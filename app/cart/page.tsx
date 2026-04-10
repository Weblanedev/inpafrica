"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import PaymentModal from "@/components/PaymentModal";
import CheckoutCompleteProfileModal from "@/components/CheckoutCompleteProfileModal";
import CountryStateSelects, {
  resolveCountryIso,
} from "@/components/CountryStateSelects";
import { useCurrency } from "@/context/CurrencyContext";
import { canViewMemberBookPrice } from "@/lib/memberPricingClient";
import { State } from "country-state-city";

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, totalPrice } = useCart();
  const { user, refreshUser } = useAuth();
  const { formatCurrency } = useCurrency();
  const member = canViewMemberBookPrice(user);
  const subtotal = totalPrice(member);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [guestRegistering, setGuestRegistering] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    if (user.phone) setPhone(user.phone);
    if (user.city) setCity(user.city);
    setCountryCode(resolveCountryIso(user.country));
    setStateName(user.state ?? "");
  }, [user]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!email.trim()) e.email = "Required";
    if (!phone.trim()) e.phone = "Required";
    if (!countryCode) e.country = "Required";
    const subdivisions = countryCode
      ? State.getStatesOfCountry(countryCode)
      : [];
    if (subdivisions.length > 0 && !stateName.trim()) {
      e.state = "Required";
    }
    if (!city.trim()) e.city = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const proceedToPayment = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (user?.needsProfileSetup) {
      setProfileModalOpen(true);
      return;
    }

    if (!user) {
      setGuestRegistering(true);
      try {
        const res = await fetch("/api/auth/checkout-register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            city: city.trim(),
            country: countryCode || undefined,
            state: stateName.trim() || undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 409) {
            toast.error(
              `${data.error ?? "Email already registered"} Use Login to continue.`,
            );
          } else {
            toast.error(data.error ?? "Could not create account");
          }
          return;
        }
        await refreshUser();
        setProfileModalOpen(true);
      } finally {
        setGuestRegistering(false);
      }
      return;
    }

    setPaymentModalOpen(true);
  };

  const linePrice = (price: number, qty: number) => price * qty;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center md:py-32">
        <h1 className="font-display text-3xl font-bold text-text">
          Your cart is empty
        </h1>
        <p className="mt-4 text-muted">
          Browse our collection and add books you love.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-lg bg-btn px-8 py-3 font-semibold text-white hover:bg-btn-hover"
        >
          Shop books
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-3xl font-bold text-text">Checkout</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-start">
            <button
              type="button"
              className="text-sm font-medium text-danger hover:underline"
              onClick={() => {
                if (
                  !window.confirm(
                    "Remove all items from your cart? This cannot be undone.",
                  )
                ) {
                  return;
                }
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              Clear cart
            </button>
          </div>
          <div className="space-y-4">
            {items.map(({ book, qty }) => {
              const unit = member ? book.memberPrice : book.price;
              return (
                <div
                  key={book.slug}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm"
                >
                  <div className="relative h-[70px] w-[50px] shrink-0 overflow-hidden rounded border border-border">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="50px"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${book.slug}`}
                      className="font-medium text-text hover:text-gold"
                    >
                      {book.title}
                    </Link>
                    <p className="font-mono text-sm text-muted">
                      {formatCurrency(unit)} each
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          className="px-3 py-1 text-lg leading-none text-text"
                          onClick={() => updateQty(book.slug, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 text-lg leading-none text-text"
                          onClick={() => updateQty(book.slug, qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-danger hover:underline"
                        onClick={() => {
                          removeFromCart(book.slug);
                          toast.success("Removed from cart");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-mono text-sm text-text">
                    {formatCurrency(linePrice(unit, qty))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end border-t border-border pt-4">
            <span className="text-muted">Subtotal </span>
            <span className="ml-2 font-mono text-lg text-text">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface2 p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-text">
              Order summary
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {items.map(({ book, qty }) => {
                const unit = member ? book.memberPrice : book.price;
                return (
                  <li key={book.slug} className="flex justify-between gap-2">
                    <span className="truncate">
                      {book.title} × {qty}
                    </span>
                    <span className="shrink-0 font-mono text-text">
                      {formatCurrency(linePrice(unit, qty))}
                    </span>
                  </li>
                );
              })}
              <li className="flex justify-between border-t border-border pt-2">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </li>
              <li className="flex justify-between text-lg font-semibold">
                <span className="text-text">Total</span>
                <span className="font-mono text-gold">{formatCurrency(subtotal)}</span>
              </li>
            </ul>
          </div>

          <form
            className="mt-4 space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              void proceedToPayment();
            }}
          >
            <h2 className="font-display text-lg font-semibold text-text">
              Details
            </h2>
            {!user && (
              <p className="rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-xs leading-relaxed text-muted">
                New here? Enter your details below. We&apos;ll create your INP
                Africa account when you continue, then ask you to choose a
                username and password so checkout is faster next time.
              </p>
            )}
            {user && !user.needsProfileSetup && (
              <p className="rounded-lg border border-border bg-surface2 px-3 py-2 text-xs text-muted">
                Signed in as{" "}
                <strong className="text-text">@{user.username}</strong>. Your
                details are filled in below. You can edit them before paying.
              </p>
            )}
            <div>
              <label className="text-xs text-muted">Full name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-muted">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-muted">Phone *</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-danger">{errors.phone}</p>
              )}
            </div>
            <CountryStateSelects
              countryCode={countryCode}
              stateName={stateName}
              onCountryChange={setCountryCode}
              onStateChange={setStateName}
              countryError={errors.country}
              stateError={errors.state}
            />
            <div>
              <label className="text-xs text-muted">City / town *</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-danger">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-muted">Delivery note (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
              />
            </div>
            <button
              type="submit"
              disabled={guestRegistering}
              className="w-full rounded-lg bg-gold py-3 font-semibold text-white hover:bg-gold-light disabled:opacity-60"
            >
              {guestRegistering
                ? "Creating your account…"
                : `Pay now (${formatCurrency(subtotal)})`}
            </button>
          </form>
        </div>
      </div>

      <CheckoutCompleteProfileModal
        isOpen={profileModalOpen}
        displayName={name.trim() || user?.name || ""}
        displayEmail={email.trim() || user?.email || ""}
        onSuccess={() => {
          setProfileModalOpen(false);
          setPaymentModalOpen(true);
        }}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        total={subtotal}
      />
    </div>
  );
}
