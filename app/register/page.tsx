"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAuth,
  type AccountType,
} from "@/context/AuthContext";
import Logo from "@/components/Logo";
import PasswordInput from "@/components/PasswordInput";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

const STORAGE_KEY = "inpafrica_pending_membership";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("customer");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold text-text">
          Create Your Account
        </h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            if (password.length < 8) {
              setError("Password must be at least 8 characters");
              return;
            }
            if (password !== confirm) {
              setError("Passwords do not match");
              return;
            }
            setLoading(true);
            try {
              const out = await register(
                name,
                username,
                email,
                password,
                accountType,
              );
              if (out.kind === "payment") {
                sessionStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify({
                    pendingId: out.pendingId,
                    accountType: out.accountType,
                    name,
                    email,
                  }),
                );
                toast.success("Continue to membership payment");
                router.push("/register/membership-pay");
                return;
              }
              toast.success(`Welcome, ${out.user.username}! Your account is ready.`);
              router.push("/products");
            } catch (err) {
              const msg =
                err instanceof Error ? err.message : "Registration failed";
              setError(msg);
            } finally {
              setLoading(false);
            }
          }}
        >
          {error && (
            <div className="rounded-lg border border-danger/50 bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </div>
          )}

          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-muted">
              I am registering as
            </legend>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
              <input
                type="radio"
                name="accountType"
                checked={accountType === "customer"}
                onChange={() => setAccountType("customer")}
              />
              Shopper (save my details for faster checkout; standard book prices)
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
              <input
                type="radio"
                name="accountType"
                checked={accountType === "affiliate"}
                onChange={() => setAccountType("affiliate")}
              />
              Affiliate (promote books &amp; courses; pay membership first)
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
              <input
                type="radio"
                name="accountType"
                checked={accountType === "vendor"}
                onChange={() => setAccountType("vendor")}
              />
              Vendor (list &amp; resell; pay listing fee first)
            </label>
          </fieldset>

          {accountType === "affiliate" && (
            <p className="rounded-lg border border-gold/25 bg-gold/5 px-3 py-2 text-xs leading-relaxed text-muted">
              {AFFILIATE_TAGLINE}
            </p>
          )}

          <div>
            <label className="text-xs text-muted">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
            />
          </div>
          <div>
            <label className="text-xs text-muted">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
            />
          </div>
          <div>
            <label className="text-xs text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
            />
          </div>
          <PasswordInput
            id="register-password"
            label="Password (min 8 characters)"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            minLength={8}
          />
          <PasswordInput
            id="register-confirm-password"
            label="Confirm password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            minLength={8}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-btn py-3 font-semibold text-white hover:bg-btn-hover disabled:opacity-60"
          >
            {loading
              ? "Working…"
              : accountType === "customer"
                ? "Create Account"
                : "Continue to membership payment"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
