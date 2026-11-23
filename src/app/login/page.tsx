"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Info,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "error">("idle");

  function validate(): boolean {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid RFC-compliant email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Week 1 prototype state: Validation successful, show Firebase connection notice
    setStatus("error");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Return to home link */}
      <div className="mb-6 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Homepage</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Brand identity header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-md shadow-blue-500/10">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Access Your Vault
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Authenticate to unlock local client-side decryption routines.
          </p>
        </div>

        {/* Authentication Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Firebase connection notice banner */}
            {status === "error" && (
              <div className="rounded-xl border border-amber-900/40 bg-amber-950/30 p-3.5 text-xs text-amber-300">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <strong className="font-semibold text-amber-200">
                      Firebase Authentication Not Connected
                    </strong>
                    <p className="mt-1 leading-relaxed text-amber-300/80">
                      Form validation passed successfully. Live cloud authentication
                      and user token issuance are scheduled for Week 2 implementation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-300"
              >
                Email Address
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="developer@gla.ac.in"
                  className={`w-full rounded-lg border bg-slate-900/60 py-2.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors focus:bg-slate-900 ${
                    errors.email
                      ? "border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                      : "border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-[11px] font-medium text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-300"
                >
                  Account Password
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  Min. 8 characters
                </span>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••••••"
                  className={`w-full rounded-lg border bg-slate-900/60 py-2.5 pl-9 pr-10 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors focus:bg-slate-900 ${
                    errors.password
                      ? "border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                      : "border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-[11px] font-medium text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
              >
                <span>Authenticate & Unlock</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Direct link to Register */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Need to create a new vault?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              >
                Register Account
              </Link>
            </p>
          </div>
        </div>

        {/* Prototype Scope Note */}
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-slate-800/60 bg-slate-900/30 p-3.5 text-[11px] text-slate-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          <p>
            Week 1 Academic Verification: No plaintext password transmissions occur.
            Master passphrase key derivation is scheduled for Week 3.
          </p>
        </div>
      </div>
    </div>
  );
}
