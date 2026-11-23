"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-card-border bg-card-bg">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <span className="text-base tracking-tight">SecurePass</span>
        </Link>

        {/* Right: Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="#features"
            className="text-muted transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/login"
            className="text-muted transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-1.5 text-muted hover:text-foreground md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-card-border bg-card-bg px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-muted hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-muted hover:text-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block rounded-lg bg-accent px-4 py-2 text-center text-xs font-medium text-white hover:bg-accent-hover"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
