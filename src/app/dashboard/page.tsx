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
  Database,
  Cpu,
  Info,
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950/95 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand identity header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white">
                SecurePass
              </span>
              <span className="ml-1.5 rounded border border-slate-800 bg-slate-900 px-1 py-0.2 font-mono text-[9px] text-slate-400">
                v0.1
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Vault Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2 px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Vault Components
          </div>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 rounded-lg border border-blue-500/20 bg-blue-600/10 px-3 py-2 text-xs font-semibold text-blue-300"
            >
              <Lock className="h-4 w-4 text-blue-400" />
              <span>All Credentials</span>
              <span className="ml-auto rounded bg-blue-900/40 px-1.5 py-0.2 font-mono text-[10px] text-blue-300">
                0
              </span>
            </Link>

            <Link
              href="/generator"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-900/60 hover:text-slate-200"
            >
              <KeyRound className="h-4 w-4 text-slate-400" />
              <span>Password Generator</span>
              <span className="ml-auto rounded border border-emerald-900/50 bg-emerald-950/40 px-1.5 py-0.2 text-[9px] text-emerald-400">
                Live
              </span>
            </Link>

            <div className="flex cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600">
              <Shield className="h-4 w-4 text-slate-600" />
              <span>Security Audit</span>
              <span className="ml-auto rounded border border-slate-800 bg-slate-900 px-1.5 py-0.2 text-[9px] text-slate-500">
                Week 7
              </span>
            </div>

            <div className="flex cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600">
              <Settings className="h-4 w-4 text-slate-600" />
              <span>Settings & MFA</span>
              <span className="ml-auto rounded border border-slate-800 bg-slate-900 px-1.5 py-0.2 text-[9px] text-slate-500">
                Week 5
              </span>
            </div>
          </nav>

          <div className="mt-8 mb-2 px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Architecture Spec
          </div>
          <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300">RNG: Web Crypto API</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="text-slate-300">Client Memory: Isolated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-slate-300">Encryption: Planned W3</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800/80 p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <div className="mt-2 px-3 text-[10px] text-slate-500">
            GLA Group G195 Academic Demo
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                Encrypted Vault Workspace
              </h1>
              <p className="text-[11px] text-slate-400">
                Local Prototype Session · Group G195
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/generator"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <KeyRound className="h-3.5 w-3.5 text-blue-400" />
              <span className="hidden sm:inline">Generate Password</span>
            </Link>
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-600/30 px-3 py-1.5 text-xs font-medium text-blue-200/60"
              title="Encrypted storage will be implemented in Week 4"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Credential (W4)</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Status Metric Grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <span className="text-[11px] font-mono text-slate-400">
                Stored Credentials
              </span>
              <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                0
              </p>
              <span className="mt-1 block text-[11px] text-slate-400">
                Empty vault state
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <span className="text-[11px] font-mono text-slate-400">
                Entropy Engine
              </span>
              <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-400">
                Active
              </p>
              <span className="mt-1 block text-[11px] text-slate-400">
                crypto.getRandomValues
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <span className="text-[11px] font-mono text-slate-400">
                Encryption Cipher
              </span>
              <p className="mt-1 text-2xl font-bold tracking-tight text-blue-400">
                AES-GCM
              </p>
              <span className="mt-1 block text-[11px] text-slate-400">
                Planned specification (W3)
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <span className="text-[11px] font-mono text-slate-400">
                Cloud Sync (Firebase)
              </span>
              <p className="mt-1 text-2xl font-bold tracking-tight text-amber-400">
                Pending
              </p>
              <span className="mt-1 block text-[11px] text-slate-400">
                Integration scheduled (W2)
              </span>
            </div>
          </div>

          {/* Empty Vault State Card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-16 text-center">
            <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 shadow-inner">
              <ShieldCheck className="h-8 w-8 text-blue-400" />
            </div>

            <h2 className="text-base font-semibold text-white sm:text-lg">
              Your Personal Vault is Currently Empty
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-400">
              No credentials have been stored in this session. Once client-side
              AES-256-GCM encryption is integrated in Week 4, credentials will be
              stored as ciphertext blobs.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/generator"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Launch Password Generator</span>
              </Link>
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-500"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Record (Week 4 Feature)</span>
              </button>
            </div>

            {/* Academic Notice */}
            <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-400">
              <Info className="h-3.5 w-3.5 text-slate-400" />
              <span>
                To inspect realistic credentials, see the illustrative preview on
                the{" "}
                <Link href="/#preview" className="text-blue-400 hover:underline">
                  homepage preview
                </Link>
                .
              </span>
            </div>
          </div>

          {/* Planned Features Roadmap Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
              <div className="flex items-center justify-between">
                <Database className="h-4 w-4 text-slate-400" />
                <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[9px] text-slate-400">
                  Week 2
                </span>
              </div>
              <h3 className="mt-2 text-xs font-semibold text-slate-200">
                Firestore Sync Architecture
              </h3>
              <p className="mt-1 text-[11px] text-slate-400">
                Encrypted blobs synchronized via user-scoped Firestore rules.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
              <div className="flex items-center justify-between">
                <Cpu className="h-4 w-4 text-slate-400" />
                <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[9px] text-slate-400">
                  Week 3
                </span>
              </div>
              <h3 className="mt-2 text-xs font-semibold text-slate-200">
                PBKDF2 Key Derivation
              </h3>
              <p className="mt-1 text-tag text-[11px] text-slate-400">
                Zero-knowledge key derivation from master passphrases.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
              <div className="flex items-center justify-between">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[9px] text-slate-400">
                  Week 5
                </span>
              </div>
              <h3 className="mt-2 text-xs font-semibold text-slate-200">
                RFC 6238 TOTP 2FA
              </h3>
              <p className="mt-1 text-[11px] text-slate-400">
                Authenticator app synchronization and 6-digit verification.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
