"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [status, setStatus] = useState<"idle" | "error">("idle");

  function validate(): boolean {
    const newErrors: RegisterErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Must contain at least one uppercase letter (A-Z).";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Must contain at least one digit (0-9).";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Prototype state: show connection requirement notice
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
            Create Master Account
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Set up credentials to initialize your encrypted personal vault.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Firebase notice banner */}
            {status === "error" && (
              <div className="rounded-xl border border-amber-900/40 bg-amber-950/30 p-3.5 text-xs text-amber-300">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <strong className="font-semibold text-amber-200">
                      Registration Interface Operational
                    </strong>
                    <p className="mt-1 leading-relaxed text-amber-300/80">
                      Input validation confirmed. Persistent user record creation
                      via Firebase Authentication will be linked in Week 2.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Anukalp Gupta"
                  className={`w-full rounded-lg border bg-slate-900/60 py-2.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors focus:bg-slate-900 ${
                    errors.name
                      ? "border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                      : "border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-[11px] font-medium text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-300">
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-300">
                Master Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Minimum 8 characters"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-slate-300"
              >
                Confirm Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                  }}
                  placeholder="Re-enter password"
                  className={`w-full rounded-lg border bg-slate-900/60 py-2.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors focus:bg-slate-900 ${
                    errors.confirmPassword
                      ? "border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                      : "border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-[11px] font-medium text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Requirements Indicator */}
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-3 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">
                Security Constraints:
              </span>
              <ul className="mt-1.5 space-y-1">
                <li
                  className={`flex items-center gap-1.5 ${
                    password.length >= 8 ? "text-emerald-400" : "text-slate-500"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  At least 8 characters
                </li>
                <li
                  className={`flex items-center gap-1.5 ${
                    /[A-Z]/.test(password) ? "text-emerald-400" : "text-slate-500"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  One uppercase character (A-Z)
                </li>
                <li
                  className={`flex items-center gap-1.5 ${
                    /[0-9]/.test(password) ? "text-emerald-400" : "text-slate-500"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  One numeric digit (0-9)
                </li>
              </ul>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
              >
                <span>Initialize Vault Account</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Link to login */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Prototype Scope Note */}
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-slate-800/60 bg-slate-900/30 p-3.5 text-[11px] text-slate-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          <p>
            Zero-knowledge design: Account passwords derive an PBKDF2 vault key
            in Week 3. Server never sees plaintext keys or credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
