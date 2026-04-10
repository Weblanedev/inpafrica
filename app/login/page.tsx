"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import PasswordInput from "@/components/PasswordInput";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold text-text">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-xs text-muted">
          Affiliate and vendor members: enter the access code you received after
          membership payment (long code like INP-…).
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            try {
              const u = await login(
                loginId,
                password,
                accessCode.trim() || undefined,
              );
              toast.success(`Welcome, ${u.username}!`);
              router.push("/products");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Login failed");
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
          <div>
            <label className="text-xs text-muted">Email or username</label>
            <input
              type="text"
              autoComplete="username"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
            />
          </div>
          <PasswordInput
            id="login-password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
          <div>
            <label htmlFor="access-code" className="text-xs text-muted">
              Member access code (affiliate / vendor only)
            </label>
            <input
              id="access-code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              autoComplete="off"
              placeholder="Leave blank if you registered as a shopper"
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 font-mono text-xs text-text placeholder:text-muted"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-btn py-3 font-semibold text-white hover:bg-btn-hover disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Log In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-gold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
