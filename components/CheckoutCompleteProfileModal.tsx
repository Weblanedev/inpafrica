"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "@/components/PasswordInput";

export default function CheckoutCompleteProfileModal({
  isOpen,
  onSuccess,
  displayName,
  displayEmail,
}: {
  isOpen: boolean;
  onSuccess: () => void;
  displayName: string;
  displayEmail: string;
}) {
  const { completeProfile } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-profile-title"
      >
        <h2
          id="checkout-profile-title"
          className="font-display text-xl font-bold text-text"
        >
          Finish your account
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We&apos;ve registered you using the details you entered at checkout (
          <strong className="text-text">{displayName}</strong>,{" "}
          <strong className="text-text">{displayEmail}</strong>). Choose a
          username and password so your next visit is seamless. You won&apos;t
          need to enter everything again.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (username.trim().length < 2) {
              toast.error("Choose a username (at least 2 characters)");
              return;
            }
            if (password.length < 8) {
              toast.error("Password must be at least 8 characters");
              return;
            }
            setBusy(true);
            try {
              await completeProfile(username.trim(), password);
              toast.success("Account ready. Continuing to payment.");
              onSuccess();
            } catch (err) {
              toast.error(
                err instanceof Error ? err.message : "Something went wrong",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <div>
            <label htmlFor="checkout-username" className="text-xs text-muted">
              Username *
            </label>
            <input
              id="checkout-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <PasswordInput
            id="checkout-new-password"
            label="Password (min 8 characters) *"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            minLength={8}
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-gold py-3 font-semibold text-white hover:bg-gold-light disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save & continue to payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
