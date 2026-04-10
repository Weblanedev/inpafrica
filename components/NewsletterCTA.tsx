"use client";

import toast from "react-hot-toast";

export default function NewsletterCTA() {
  return (
    <section className="border-y border-gold/25 bg-gold/10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-text md:text-3xl">
          Get Free Book Recommendations
        </h2>
        <form
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thanks! You’re subscribed.");
          }}
          suppressHydrationWarning
        >
          <input
            type="email"
            required
            placeholder="Your email"
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold"
            suppressHydrationWarning
          />
          <button
            type="submit"
            className="rounded-lg bg-btn px-6 py-3 text-sm font-semibold text-white hover:bg-btn-hover"
            suppressHydrationWarning
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
