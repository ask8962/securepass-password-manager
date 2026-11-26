"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import {
  FIREBASE_NOT_CONFIGURED_MESSAGE,
  MIN_LOGIN_PASSWORD_LENGTH,
  getFirebaseAuthErrorMessage,
  validateEmailField,
  validatePasswordField,
} from "@/lib/authValidation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: { email?: string; password?: string } = {};

    const emailError = validateEmailField(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Use Firebase's 6-character minimum on login so valid existing accounts are not rejected.
    const passwordError = validatePasswordField(password, MIN_LOGIN_PASSWORD_LENGTH);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);

    if (!validate()) return;

    if (!isFirebaseConfigured() || !auth) {
      setAuthError(FIREBASE_NOT_CONFIGURED_MESSAGE);
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Firebase Login Error:", err);
      setAuthError(
        getFirebaseAuthErrorMessage(err, "Failed to sign in. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6">
      <div className="w-full max-w-sm">
        {/* Logo and heading */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <span className="text-lg tracking-tight">SecurePass</span>
          </Link>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-1 text-xs text-muted">
            Enter your credentials to access your vault.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Auth error notification */}
            {authError && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                <div className="leading-relaxed">{authError}</div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.com"
                className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-card-border focus:border-accent"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-foreground">
                  Password
                </label>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-white px-3 py-2 pr-10 text-sm text-foreground outline-none transition-colors ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-card-border focus:border-accent"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-accent py-2.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 border-t border-card-border pt-4 text-center">
            <p className="text-xs text-muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-accent hover:underline">
                Get started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
