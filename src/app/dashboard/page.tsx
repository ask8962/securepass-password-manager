"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Shield,
  Settings,
  LogOut,
  ArrowRight,
  Menu,
  X,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  encryptPassword,
  decryptPassword,
  EncryptedPayload,
} from "@/lib/crypto";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, isConfigured, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Encryption Demo State (in-memory only)
  const [website, setWebsite] = useState("google.com");
  const [username, setUsername] = useState("student@gla.ac.in");
  const [samplePassword, setSamplePassword] = useState("SecretPassword123!");
  const [encryptPassphrase, setEncryptPassphrase] = useState("MasterDemoKey2026!");
  const [encryptedRecord, setEncryptedRecord] = useState<EncryptedPayload | null>(null);

  // Decryption Demo State
  const [decryptPassphrase, setDecryptPassphrase] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState<string | null>(null);
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Visibility toggles
  const [showSamplePass, setShowSamplePass] = useState(false);
  const [showEncryptPass, setShowEncryptPass] = useState(false);
  const [showDecryptPass, setShowDecryptPass] = useState(false);
  const [copiedCipher, setCopiedCipher] = useState(false);

  // Protect route if Firebase is configured
  useEffect(() => {
    if (!loading && isConfigured && !user) {
      router.replace("/login");
    }
  }, [user, loading, isConfigured, router]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  // Handle Encryption
  async function handleEncrypt(e: React.FormEvent) {
    e.preventDefault();
    setDecryptError(null);
    setDecryptedPassword(null);

    if (!samplePassword || !encryptPassphrase) {
      return;
    }

    setIsProcessing(true);
    try {
      const payload = await encryptPassword(samplePassword, encryptPassphrase);
      setEncryptedRecord(payload);
      setDecryptPassphrase(""); // Clear decrypt input
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  // Handle Decryption
  async function handleDecrypt(e: React.FormEvent) {
    e.preventDefault();
    if (!encryptedRecord) return;

    setDecryptError(null);
    setDecryptedPassword(null);
    setIsProcessing(true);

    try {
      const result = await decryptPassword(encryptedRecord, decryptPassphrase);
      setDecryptedPassword(result);
    } catch (err: unknown) {
      const error = err as Error;
      setDecryptError(error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  // Reset Demo State
  function handleResetDemo() {
    setEncryptedRecord(null);
    setDecryptedPassword(null);
    setDecryptError(null);
    setDecryptPassphrase("");
    setSamplePassword("SecretPassword123!");
    setEncryptPassphrase("MasterDemoKey2026!");
  }

  function handleCopyCipher() {
    if (!encryptedRecord) return;
    navigator.clipboard.writeText(encryptedRecord.ciphertext);
    setCopiedCipher(true);
    setTimeout(() => setCopiedCipher(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted">
        Loading vault session...
      </div>
    );
  }

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

        {/* User Session & Logout in Sidebar */}
        <div className="border-t border-card-border p-3">
          <div className="mb-2 px-3 py-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Current Session
            </p>
            <p className="truncate text-xs font-medium text-foreground">
              {user?.email || "Guest / Demo Mode"}
            </p>
          </div>

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          )}

          {!user && (
            <Link
              href="/login"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-accent transition-colors hover:bg-muted-light"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Sign in with Firebase</span>
            </Link>
          )}
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
            <div>
              <h1 className="text-base font-semibold text-foreground">
                My Vault
              </h1>
              <p className="text-xs text-muted">
                {user ? `Logged in as: ${user.email}` : "Academic Prototype Demo"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/generator"
              className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted-light"
            >
              <KeyRound className="h-3.5 w-3.5 text-accent" />
              <span className="hidden sm:inline">Password Generator</span>
            </Link>

            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Firebase Configuration Notice if not set up */}
          {!isConfigured && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div className="space-y-1">
                <strong>Firebase credentials are not configured yet.</strong>
                <p className="text-amber-800 leading-relaxed">
                  To test live Firebase login and registration with real user accounts, follow the 3-minute setup guide in{" "}
                  <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-[11px]">
                    docs/firebase-setup-notes.md
                  </code>{" "}
                  and add your credentials to <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-[11px]">.env.local</code>.
                  You can still test the <strong>Local Encryption Demo</strong> and the <strong>Password Generator</strong> right below!
                </p>
              </div>
            </div>
          )}

          {/* User Welcome Card */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {user
                    ? `Welcome back, ${
                        user.displayName
                          ? `${user.displayName} (${user.email})`
                          : user.email
                      }`
                    : "Welcome to SecurePass Prototype"}
                </h2>
                <p className="text-xs text-muted">
                  B.Tech CSE Major Project (25% Prototype) · Group G195 · GLA University
                </p>
              </div>

              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Web Crypto AES-256-GCM Ready
                </span>
              </div>
            </div>
          </div>

          {/* FEATURE 3: Local Encryption Demonstration */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-card-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">
                    Local Encryption Demonstration
                  </h2>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-200">
                    AES-256-GCM + PBKDF2
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Test client-side cryptographic encryption and decryption in real-time. Data is held in browser RAM only.
                </p>
              </div>

              {encryptedRecord && (
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>

            {/* Step 1: Encrypt Form */}
            <form onSubmit={handleEncrypt} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground">
                    Sample Service / Website
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. google.com"
                    className="mt-1.5 w-full rounded-lg border border-card-border bg-white px-3 py-2 text-xs text-foreground outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground">
                    Sample Username / Email
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. student@gla.ac.in"
                    className="mt-1.5 w-full rounded-lg border border-card-border bg-white px-3 py-2 text-xs text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-foreground">
                      Sample Password to Encrypt
                    </label>
                    <Link
                      href="/generator"
                      className="text-[11px] text-accent hover:underline"
                    >
                      Use Generator →
                    </Link>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      type={showSamplePass ? "text" : "password"}
                      value={samplePassword}
                      onChange={(e) => setSamplePassword(e.target.value)}
                      placeholder="Enter a secret password"
                      className="w-full rounded-lg border border-card-border bg-white px-3 py-2 pr-9 text-xs text-foreground outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSamplePass(!showSamplePass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                    >
                      {showSamplePass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground">
                    Demo Master Passphrase (Key)
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type={showEncryptPass ? "text" : "password"}
                      value={encryptPassphrase}
                      onChange={(e) => setEncryptPassphrase(e.target.value)}
                      placeholder="Master key to derive encryption key"
                      className="w-full rounded-lg border border-card-border bg-white px-3 py-2 pr-9 text-xs text-foreground outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEncryptPass(!showEncryptPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                    >
                      {showEncryptPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Encrypt with AES-256-GCM</span>
              </button>
            </form>

            {/* Result Box: Ciphertext Display */}
            {encryptedRecord && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Password Encrypted Successfully</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted">
                    {encryptedRecord.timestamp}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-muted block text-[11px]">PBKDF2 Salt (128-bit):</span>
                    <span className="text-foreground break-all bg-white px-2 py-0.5 rounded border border-slate-200 block">
                      {encryptedRecord.salt}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted block text-[11px]">AES-GCM Random IV / Nonce (96-bit):</span>
                    <span className="text-foreground break-all bg-white px-2 py-0.5 rounded border border-slate-200 block">
                      {encryptedRecord.iv}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted block text-[11px]">AES-256-GCM Ciphertext + Tag:</span>
                      <button
                        type="button"
                        onClick={handleCopyCipher}
                        className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
                      >
                        {copiedCipher ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedCipher ? "Copied" : "Copy Ciphertext"}</span>
                      </button>
                    </div>
                    <span className="text-foreground break-all bg-white px-2 py-1 rounded border border-slate-200 block font-bold text-blue-900">
                      {encryptedRecord.ciphertext}
                    </span>
                  </div>
                </div>

                {/* Step 2: Decrypt Form */}
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <h3 className="text-xs font-semibold text-foreground mb-2">
                    Test Decryption
                  </h3>
                  <p className="text-[11px] text-muted mb-3">
                    Enter the master passphrase to test key derivation and authentication-tag verification. Try an incorrect passphrase to see the tamper protection error.
                  </p>

                  <form onSubmit={handleDecrypt} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showDecryptPass ? "text" : "password"}
                          value={decryptPassphrase}
                          onChange={(e) => setDecryptPassphrase(e.target.value)}
                          placeholder="Enter master passphrase to decrypt"
                          className="w-full rounded-lg border border-card-border bg-white px-3 py-2 pr-9 text-xs text-foreground outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowDecryptPass(!showDecryptPass)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                        >
                          {showDecryptPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <span>Decrypt</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Decryption Success Box */}
                    {decryptedPassword && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 flex items-center justify-between">
                        <div>
                          <strong>Decryption Successful:</strong>
                          <span className="ml-2 font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800">
                            {decryptedPassword}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-700">Auth Tag Verified</span>
                      </div>
                    )}

                    {/* Decryption Error Box */}
                    {decryptError && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-900 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                        <div>
                          <strong>Authentication Tag Rejected:</strong>
                          <p className="mt-0.5 text-red-700">{decryptError}</p>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}

            {/* Academic Prototype Notice */}
            <div className="border-t border-card-border pt-4 text-[11px] text-muted space-y-1">
              <p>
                <strong>Academic Prototype Details:</strong> Uses Web Crypto API{" "}
                <code className="font-mono text-foreground">PBKDF2-SHA-256</code> (100,000 iterations) for key derivation, and{" "}
                <code className="font-mono text-foreground">AES-256-GCM</code> (96-bit nonce) for authenticated encryption.
              </p>
              <p>
                Data is held temporarily in React component memory for live presentation and is automatically discarded on page reload or sign-out.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
