"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ShieldCheck, ArrowLeft } from "lucide-react";

const PasswordGeneratorClient = dynamic(
  () => import("./PasswordGeneratorClient"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-card-border bg-card-bg p-5 text-xs text-muted shadow-sm">
        Generating secure password...
      </div>
    ),
  }
);

export default function GeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-card-bg px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="text-sm tracking-tight">SecurePass</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Password Generator
            </h1>
            <p className="mt-1 text-xs text-muted">
              Create strong, random passwords that are difficult to guess.
            </p>
          </div>

          <PasswordGeneratorClient />
        </div>
      </main>
    </div>
  );
}
