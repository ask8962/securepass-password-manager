"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function GeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generatePassword = useCallback(() => {
    // Build the character pool based on selected options
    let pool = "";
    if (options.uppercase) pool += CHAR_SETS.uppercase;
    if (options.lowercase) pool += CHAR_SETS.lowercase;
    if (options.numbers) pool += CHAR_SETS.numbers;
    if (options.special) pool += CHAR_SETS.special;

    if (pool.length === 0) {
      setError("Select at least one character type.");
      setPassword("");
      return;
    }

    if (length < 4 || length > 128) {
      setError("Password length must be between 4 and 128.");
      setPassword("");
      return;
    }

    setError("");

    // Use crypto.getRandomValues for cryptographically secure randomness
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[array[i] % pool.length];
    }

    // Ensure at least one character from each selected set is present
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
      // Fallback: select the text
      setError("Could not copy. Please select and copy manually.");
    }
  }

  function toggleOption(key: keyof typeof options) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function getStrength(): { label: string; color: string; width: string } {
    if (!password) return { label: "", color: "", width: "0%" };

    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (password.length >= 20) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-danger", width: "25%" };
    if (score <= 4) return { label: "Fair", color: "bg-warning", width: "50%" };
    if (score <= 5) return { label: "Good", color: "bg-accent", width: "75%" };
    return { label: "Strong", color: "bg-success", width: "100%" };
  }

  const strength = getStrength();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-card-border px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm text-white">
              🔐
            </span>
            <span>
              Secure<span className="text-accent">Pass</span>
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-2 text-2xl font-bold">Password Generator</h1>
          <p className="mb-8 text-sm text-muted">
            Generate cryptographically secure passwords using{" "}
            <code className="rounded bg-card-bg px-1 py-0.5 text-xs font-mono">
              crypto.getRandomValues
            </code>
          </p>

          {/* Generated Password Display */}
          <div className="mb-6 rounded-xl border border-card-border bg-card-bg p-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden">
                <p
                  className={`font-mono text-lg break-all ${
                    password ? "text-foreground" : "text-muted/40"
                  }`}
                >
                  {password || "Click Generate to create a password"}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="shrink-0 rounded-lg border border-card-border px-4 py-2 text-sm transition-colors hover:bg-card-border/30 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Copy to clipboard"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>

            {/* Strength Meter */}
            {password && (
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted">Strength</span>
                  <span className="font-medium">{strength.label}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-card-border">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          {/* Options */}
          <div className="mb-6 rounded-xl border border-card-border bg-card-bg p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Options
            </h2>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="length" className="text-sm font-medium">
                  Password Length
                </label>
                <span className="rounded-lg bg-background px-3 py-1 text-sm font-mono font-bold text-accent">
                  {length}
                </span>
              </div>
              <input
                id="length"
                type="range"
                min={4}
                max={128}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-1 flex justify-between text-xs text-muted">
                <span>4</span>
                <span>128</span>
              </div>
            </div>

            {/* Character toggles */}
            <div className="space-y-3">
              {(
                [
                  ["uppercase", "Uppercase Letters", "A-Z"],
                  ["lowercase", "Lowercase Letters", "a-z"],
                  ["numbers", "Numbers", "0-9"],
                  ["special", "Special Characters", "!@#$%^&*"],
                ] as const
              ).map(([key, label, example]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-background"
                >
                  <div>
                    <span className="text-sm font-medium">{label}</span>
                    <span className="ml-2 text-xs font-mono text-muted">
                      {example}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={() => toggleOption(key)}
                    className="h-4 w-4 rounded accent-accent"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full rounded-lg bg-accent py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            ⚡ Generate Secure Password
          </button>

          {/* Info */}
          <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-4">
            <p className="text-xs leading-relaxed text-muted">
              <strong className="text-foreground">How it works:</strong> This
              generator uses the Web Crypto API (
              <code className="font-mono">crypto.getRandomValues</code>) to
              produce cryptographically secure random values. Generated passwords
              are never stored, logged, or transmitted. All generation happens
              locally in your browser.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
