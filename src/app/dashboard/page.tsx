"use client";

import Link from "next/link";
import { useState } from "react";

const sidebarItems = [
  { icon: "🔒", label: "Vault", href: "/dashboard", active: true },
  { icon: "⚡", label: "Generator", href: "/generator" },
  { icon: "🛡️", label: "Security", href: "#", disabled: true, badge: "Soon" },
  { icon: "⚙️", label: "Settings", href: "#", disabled: true, badge: "Soon" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-card-border bg-card-bg p-2 md:hidden"
        aria-label="Toggle sidebar"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-card-border bg-card-bg transition-transform md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center gap-2 border-b border-card-border px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm text-white">
            🔐
          </span>
          <span className="text-lg font-bold">
            Secure<span className="text-accent">Pass</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 px-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.disabled ? "#" : item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "bg-accent/10 text-accent"
                  : item.disabled
                  ? "cursor-not-allowed text-muted/50"
                  : "text-muted hover:bg-card-border/30 hover:text-foreground"
              }`}
              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-card-border px-2 py-0.5 text-[10px] text-muted">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-card-border p-4">
          <Link
            href="/"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-danger/10 hover:text-danger"
          >
            <span>🚪</span>
            <span>Back to Home</span>
          </Link>
          <p className="mt-2 px-3 text-[10px] text-muted/40">
            Auth not connected — logout disabled
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 md:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Your Vault</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your stored credentials securely.
          </p>
        </div>

        {/* Empty Vault State */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border py-20">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-card-bg text-3xl">
            🔒
          </div>
          <h2 className="mb-2 text-lg font-semibold">Your vault is empty</h2>
          <p className="mb-6 max-w-sm text-center text-sm text-muted">
            You haven&apos;t stored any credentials yet. Add your first password
            to get started.
          </p>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-accent/50 px-6 py-2.5 text-sm font-medium text-white/70 cursor-not-allowed"
            title="Credential storage will be implemented in a future week"
          >
            <span>+</span>
            Add Credential (Coming Soon)
          </button>
          <p className="mt-3 text-xs text-muted/60">
            Encrypted credential storage is planned for Week 4.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/generator"
            className="rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/40"
          >
            <span className="text-2xl">⚡</span>
            <h3 className="mt-3 font-semibold">Password Generator</h3>
            <p className="mt-1 text-sm text-muted">
              Generate strong, secure passwords instantly.
            </p>
          </Link>

          <div className="rounded-xl border border-card-border bg-card-bg p-6 opacity-50">
            <span className="text-2xl">🛡️</span>
            <h3 className="mt-3 font-semibold">Security Score</h3>
            <p className="mt-1 text-sm text-muted">
              Planned — analyze your password health.
            </p>
            <span className="mt-2 inline-block rounded-full bg-card-border px-2 py-0.5 text-[10px] text-muted">
              Week 7
            </span>
          </div>

          <div className="rounded-xl border border-card-border bg-card-bg p-6 opacity-50">
            <span className="text-2xl">🔑</span>
            <h3 className="mt-3 font-semibold">Two-Factor Auth</h3>
            <p className="mt-1 text-sm text-muted">
              Planned — TOTP-based vault protection.
            </p>
            <span className="mt-2 inline-block rounded-full bg-card-border px-2 py-0.5 text-[10px] text-muted">
              Week 5–6
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
