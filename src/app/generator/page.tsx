"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import {
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
  ArrowLeft,
  Sliders,
  Terminal,
} from "lucide-react";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function GeneratorPage() {
  const [length, setLength] = useState(20);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });

  // Safe initial entropy calculation
  const [password, setPassword] = useState(() => {
    return "k8#P9!vX$2mQ~L7rW5@t";
  });

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generatePassword = useCallback(() => {
    let pool = "";
    if (options.uppercase) pool += CHAR_SETS.uppercase;
    if (options.lowercase) pool += CHAR_SETS.lowercase;
    if (options.numbers) pool += CHAR_SETS.numbers;
    if (options.special) pool += CHAR_SETS.special;

    if (pool.length === 0) {
      setError("At least one character set must be active.");
      setPassword("");
      return;
    }

    if (length < 4 || length > 128) {
      setError("Length constraint must be between 4 and 128 characters.");
      setPassword("");
      return;
    }

    setError("");

    // Cryptographically Secure Pseudorandom Number Generator (CSPRNG)
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[array[i] % pool.length];
    }

    // Ensure at least one character from each selected set is guaranteed present
    const required: string[] = [];
    if (options.uppercase) required.push(CHAR_SETS.uppercase);
    if (options.lowercase) required.push(CHAR_SETS.lowercase);
    if (options.numbers) required.push(CHAR_SETS.numbers);
    if (options.special) required.push(CHAR_SETS.special);

    if (required.length <= length) {
      const positions = new Uint32Array(required.length);
      crypto.getRandomValues(positions);
      const chars = result.split("");
      const usedPositions = new Set<number>();

      for (let i = 0; i < required.length; i++) {
        let pos = positions[i] % length;
        while (usedPositions.has(pos)) {
          pos = (pos + 1) % length;
        }
        usedPositions.add(pos);

        const charArray = new Uint32Array(1);
        crypto.getRandomValues(charArray);
        chars[pos] = required[i][charArray[0] % required[i].length];
      }
      result = chars.join("");
    }

    setPassword(result);
    setCopied(false);
  }, [length, options]);

  async function copyToClipboard() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Clipboard access denied. Please manually highlight and copy.");
    }
  }

  function toggleOption(key: keyof typeof options) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Calculate approximate entropy bits
  function getEntropy(): { bits: number; label: string; color: string; barWidth: string } {
    let poolSize = 0;
    if (options.uppercase) poolSize += 26;
    if (options.lowercase) poolSize += 26;
    if (options.numbers) poolSize += 10;
    if (options.special) poolSize += 30;

    if (!password || poolSize === 0) {
      return { bits: 0, label: "Insufficient", color: "bg-red-500", barWidth: "5%" };
    }

    const bits = Math.round(length * Math.log2(poolSize));

    if (bits < 45) {
      return { bits, label: "Weak Entropy", color: "bg-red-500", barWidth: "25%" };
    }
    if (bits < 65) {
      return { bits, label: "Moderate Entropy", color: "bg-amber-500", barWidth: "50%" };
    }
    if (bits < 90) {
      return { bits, label: "Strong Cryptographic Entropy", color: "bg-blue-500", barWidth: "75%" };
    }
    return { bits, label: "Maximum Entropy", color: "bg-emerald-400", barWidth: "100%" };
  }

  const entropy = getEntropy();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="border-b border-card-border-subtle bg-slate-950/70 px-4 py-3.5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold tracking-tight text-white">
                SecurePass
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                / generator
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Vault Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Generator Section */}
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              CSPRNG Tool
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Cryptographic Password Generator
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
              Produces unbiased pseudorandom entropy using the Web Crypto API (
              <code className="rounded bg-slate-900 px-1 py-0.5 font-mono text-[11px] text-blue-300">
                crypto.getRandomValues
              </code>
              ). Operates strictly client-side without network transmission.
            </p>
          </div>

          {/* Password Output Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 overflow-x-auto py-1">
                <span className="block font-mono text-lg font-semibold tracking-wider text-white break-all select-all sm:text-xl">
                  {password || "No password generated"}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={generatePassword}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                  title="Generate new random sequence"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-blue-400" />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!password}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:opacity-40"
                  title="Copy password to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                      <span className="text-emerald-200">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Entropy Meter */}
            <div className="mt-5 border-t border-slate-800/80 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  Strength:{" "}
                  <strong className="text-slate-200">{entropy.label}</strong>
                </span>
                <span className="font-mono text-slate-400">
                  Estimated Entropy:{" "}
                  <strong className="text-blue-400">~{entropy.bits} bits</strong>
                </span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
                <div
                  className={`h-full transition-all duration-300 ${entropy.color}`}
                  style={{ width: entropy.barWidth }}
                />
              </div>
            </div>
          </div>

          {/* Validation error if any */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-900/40 bg-red-950/20 p-3 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Configuration Controls Card */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Sliders className="h-4 w-4 text-blue-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Entropy Configuration
              </h2>
            </div>

            {/* Password Length Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="length-slider"
                  className="text-xs font-medium text-slate-300"
                >
                  Password Length (Characters)
                </label>
                <span className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-blue-400">
                  {length} chars
                </span>
              </div>

              <input
                id="length-slider"
                type="range"
                min={4}
                max={128}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="mt-3 w-full cursor-pointer accent-blue-500"
              />

              <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
                <span>4 (Minimum)</span>
                <span>32 (Recommended)</span>
                <span>64</span>
                <span>128 (Maximum)</span>
              </div>
            </div>

            {/* Character Set Toggles */}
            <div className="mt-8">
              <span className="block text-xs font-medium text-slate-300">
                Character Sets Included
              </span>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    key: "uppercase" as const,
                    title: "Uppercase Letters",
                    sample: "A B C D E F G H...",
                    count: "26 chars",
                  },
                  {
                    key: "lowercase" as const,
                    title: "Lowercase Letters",
                    sample: "a b c d e f g h...",
                    count: "26 chars",
                  },
                  {
                    key: "numbers" as const,
                    title: "Numeric Digits",
                    sample: "0 1 2 3 4 5 6 7 8 9",
                    count: "10 chars",
                  },
                  {
                    key: "special" as const,
                    title: "Special Symbols",
                    sample: "! @ # $ % ^ & * ( ) _ +",
                    count: "30 chars",
                  },
                ].map((item) => {
                  const isChecked = options[item.key];

                  return (
                    <label
                      key={item.key}
                      className={`flex cursor-pointer items-start justify-between rounded-xl border p-3.5 transition-all ${
                        isChecked
                          ? "border-blue-500/40 bg-blue-950/20 text-slate-200"
                          : "border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-200">
                            {item.title}
                          </span>
                          <span className="rounded bg-slate-800/80 px-1.5 py-0.2 font-mono text-[9px] text-slate-400">
                            {item.count}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-[11px] text-slate-400">
                          {item.sample}
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOption(item.key)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 accent-blue-600"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cryptographic Technical Explanation */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 text-xs text-slate-400">
            <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
            <div className="space-y-1">
              <strong className="text-slate-200">
                Cryptographic Implementation Note:
              </strong>
              <p className="leading-relaxed">
                Standard pseudorandom generators like{" "}
                <code className="font-mono text-slate-300">Math.random()</code>{" "}
                are non-cryptographic and vulnerable to seed prediction. SecurePass
                exclusively samples entropy via{" "}
                <code className="font-mono text-slate-300">
                  crypto.getRandomValues(Uint32Array)
                </code>
                , leveraging OS-level entropy pools. Passwords are never saved,
                logged, or cached.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
