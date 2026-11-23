"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Shield,
  Settings,
  Plus,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-card-border bg-card-bg transition-transform md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-card-border px-5">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="text-sm tracking-tight">SecurePass</span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-muted hover:text-foreground md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-1 p-3 text-xs">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-lg bg-muted-light px-3 py-2 font-medium text-foreground"
          >
            <Lock className="h-4 w-4 text-accent" />
            <span>My Vault</span>
          </Link>

          <Link
            href="/generator"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium text-muted transition-colors hover:bg-muted-light hover:text-foreground"
          >
            <KeyRound className="h-4 w-4" />
            <span>Password Generator</span>
          </Link>

          <div className="flex items-center justify-between rounded-lg px-3 py-2 text-muted/60">
            <div className="flex items-center gap-2.5">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </div>
            <span className="text-[10px]">Soon</span>
          </div>

          <div className="flex items-center justify-between rounded-lg px-3 py-2 text-muted/60">
            <div className="flex items-center gap-2.5">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
            <span className="text-[10px]">Soon</span>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-card-border p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted hover:bg-muted-light hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-card-border bg-card-bg px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-1.5 text-muted hover:text-foreground md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-semibold text-foreground">
              My Vault
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/generator"
              className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted-light"
            >
              <KeyRound className="h-3.5 w-3.5 text-accent" />
              <span>Generate Password</span>
            </Link>

            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-accent/50 px-3 py-1.5 text-xs font-medium text-white"
              title="Credential storage will be added in a future update"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Credential (Coming Soon)</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Empty Vault State */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border bg-card-bg px-6 py-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted-light">
              <Lock className="h-6 w-6 text-muted" />
            </div>

            <h2 className="text-base font-semibold text-foreground">
              No passwords stored yet
            </h2>
            <p className="mt-1 max-w-sm text-xs text-muted">
              Your vault is empty. You can generate a secure password or return later once credential saving is available.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/generator"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Open Password Generator</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
