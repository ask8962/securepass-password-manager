"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X, ArrowRight, Lock } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-card-border-subtle bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-95"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-sm shadow-blue-500/10 transition-colors group-hover:border-blue-500/50 group-hover:bg-blue-500/15">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold tracking-tight text-white">
                Secure<span className="text-blue-400">Pass</span>
              </span>
              <span className="hidden rounded border border-slate-800 bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-slate-400 sm:inline-block">
                G195
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#preview"
            className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
          >
            Vault Preview
          </Link>
          <Link
            href="#security-model"
            className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
          >
            Security Spec
          </Link>
          <Link
            href="#academic"
            className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
          >
            Project
          </Link>
        </nav>

        {/* Right side CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-600/90 px-4 py-2 text-xs font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:border-blue-400 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/40"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Open Vault</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-background/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
            >
              Vault Preview
            </Link>
            <Link
              href="#security-model"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
            >
              Security Spec
            </Link>
            <Link
              href="#academic"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
            >
              Project Details
            </Link>
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-800/80 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 py-2.5 text-xs font-medium text-slate-200"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2.5 text-xs font-medium text-white"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Launch Prototype Vault</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
