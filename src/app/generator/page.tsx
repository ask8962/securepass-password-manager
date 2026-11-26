"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import {
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const AMBIGUOUS_CHARS_REGEX = /[0O1lI]/g;

export default function GeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
    excludeAmbiguous: false,
  });

  const [password, setPassword] = useState("k8#P9!vX$2mQ~L7r");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generatePassword = useCallback(() => {
    const filterAmbiguous = (str: string) =>
      options.excludeAmbiguous ? str.replace(AMBIGUOUS_CHARS_REGEX, "") : str;

    const activeSets = {
      uppercase: filterAmbiguous(CHAR_SETS.uppercase),
      lowercase: filterAmbiguous(CHAR_SETS.lowercase),
      numbers: filterAmbiguous(CHAR_SETS.numbers),
      special: filterAmbiguous(CHAR_SETS.special),
    };

    let pool = "";
    if (options.uppercase) pool += activeSets.uppercase;
    if (options.lowercase) pool += activeSets.lowercase;
    if (options.numbers) pool += activeSets.numbers;
    if (options.special) pool += activeSets.special;

    if (pool.length === 0) {
      setError("Please select at least one character type.");
      setPassword("");
      return;
    }

    if (length < 4 || length > 128) {
      setError("Password length must be between 4 and 128.");
      setPassword("");
      return;
    }

    setError("");

    // Cryptographically secure pseudorandom number generation
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[array[i] % pool.length];
    }

    // Ensure at least one character from each selected set
    const required: string[] = [];
    if (options.uppercase && activeSets.uppercase.length > 0) {
      required.push(activeSets.uppercase);
    }
    if (options.lowercase && activeSets.lowercase.length > 0) {
      required.push(activeSets.lowercase);
    }
    if (options.numbers && activeSets.numbers.length > 0) {
      required.push(activeSets.numbers);
    }
    if (options.special && activeSets.special.length > 0) {
      required.push(activeSets.special);
    }

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
      setError("Unable to copy to clipboard.");
    }
  }

  function toggleOption(key: keyof typeof options) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function getStrength(): { label: string; color: string; width: string } {
    if (!password) return { label: "", color: "", width: "0%" };

    let score = 0;
    if (password.length >= 10) score++;
    if (password.length >= 14) score++;
    if (password.length >= 18) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score <= 4) return { label: "Fair", color: "bg-amber-500", width: "50%" };
    if (score <= 5) return { label: "Good", color: "bg-blue-600", width: "75%" };
    return { label: "Strong", color: "bg-emerald-600", width: "100%" };
  }

  const strength = getStrength();

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

          {/* Generated Password Box */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 overflow-x-auto py-1 font-mono text-base font-semibold text-foreground sm:text-lg select-all">
                {password || "No password generated"}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!password}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
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

            {/* Simple strength indicator */}
            {password && (
              <div className="mt-4 border-t border-card-border pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Password strength:</span>
                  <span className="font-medium text-foreground">{strength.label}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted-light">
                  <div
                    className={`h-full transition-all duration-200 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Controls Card */}
          <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-5 shadow-sm sm:p-6">
            {/* Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium">
                <label htmlFor="length-slider" className="text-foreground">
                  Length:
                </label>
                <span className="rounded bg-muted-light px-2 py-0.5 font-mono font-semibold text-foreground">
                  {length}
                </span>
              </div>

              <input
                id="length-slider"
                type="range"
                min={4}
                max={128}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="mt-3 w-full accent-accent cursor-pointer"
              />

              <div className="mt-1 flex justify-between text-[11px] text-muted">
                <span>4</span>
                <span>128</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-6 border-t border-card-border pt-4">
              <span className="block text-xs font-medium text-foreground">
                Character options
              </span>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  { key: "uppercase" as const, label: "Uppercase letters (A-Z)" },
                  { key: "lowercase" as const, label: "Lowercase letters (a-z)" },
                  { key: "numbers" as const, label: "Numbers (0-9)" },
                  { key: "special" as const, label: "Symbols (!@#$...)" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-card-border px-3 py-2 text-xs transition-colors hover:bg-muted-light"
                  >
                    <span className="text-foreground">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={options[item.key]}
                      onChange={() => toggleOption(item.key)}
                      className="h-4 w-4 rounded accent-accent"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-3">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-card-border px-3 py-2 text-xs transition-colors hover:bg-muted-light">
                  <div>
                    <span className="font-medium text-foreground">
                      Exclude ambiguous characters
                    </span>
                    <span className="block text-[11px] text-muted">
                      Avoid similar-looking characters (0, O, 1, l, I)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.excludeAmbiguous}
                    onChange={() => toggleOption("excludeAmbiguous")}
                    className="h-4 w-4 rounded accent-accent"
                  />
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-6 pt-2">
              <button
                type="button"
                onClick={generatePassword}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Generate New Password</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
