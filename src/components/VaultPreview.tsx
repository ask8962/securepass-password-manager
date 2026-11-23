"use client";

import { useState } from "react";
import {
  Shield,
  Search,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

interface MockCredential {
  id: string;
  title: string;
  username: string;
  category: string;
  strength: "High Entropy" | "Strong" | "Good";
  updated: string;
  charCount: number;
}

const mockVaultItems: MockCredential[] = [
  {
    id: "item-1",
    title: "GitHub Developer Account",
    username: "dev-lead@securepass.internal",
    category: "Developer",
    strength: "High Entropy",
    updated: "2 days ago",
    charCount: 24,
  },
  {
    id: "item-2",
    title: "ProtonMail Secure Workspace",
    username: "anukalp.g195@proton.me",
    category: "Communications",
    strength: "High Entropy",
    updated: "5 days ago",
    charCount: 20,
  },
  {
    id: "item-3",
    title: "GLA University Academic Portal",
    username: "2115000780@gla.ac.in",
    category: "Education",
    strength: "Good",
    updated: "1 week ago",
    charCount: 16,
  },
];

export default function VaultPreview() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleId, setVisibleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockVaultItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleCopy(id: string) {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }

  function toggleVisible(id: string) {
    setVisibleId(visibleId === id ? null : id);
  }

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
      {/* Top Application Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-400">
            securepass-vault-preview.session
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded border border-blue-500/30 bg-blue-950/40 px-2 py-0.5 font-mono text-[10px] text-blue-300">
            <Shield className="h-3 w-3" />
            Client Sandbox
          </span>
        </div>
      </div>

      {/* Illustrative preview disclaimer banner */}
      <div className="border-b border-blue-900/30 bg-blue-950/20 px-4 py-2">
        <p className="text-[11px] leading-relaxed text-blue-300/90">
          <span className="font-semibold text-blue-200">Demonstration Preview:</span>{" "}
          Interactive layout preview showing the planned Week 4 client-side vault design.
          All credentials below are synthetic sample records.
        </p>
      </div>

      {/* Vault Inner Layout */}
      <div className="p-4 sm:p-5">
        {/* Search & Actions Bar */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search synthetic vault items..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900/70 py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-blue-500 focus:bg-slate-900"
            />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="rounded bg-slate-900 px-2 py-1 font-mono">
              {filtered.length} Records
            </span>
          </div>
        </div>

        {/* Credentials List */}
        <div className="space-y-2.5">
          {filtered.map((item) => {
            const isVisible = visibleId === item.id;
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between gap-3 rounded-xl border border-slate-800/90 bg-slate-900/40 p-3.5 transition-all hover:border-slate-700 hover:bg-slate-900/80 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400">
                    <Lock className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-slate-100">
                        {item.title}
                      </p>
                      <span className="rounded bg-slate-800/80 px-1.5 py-0.2 text-[9px] font-medium text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                      {item.username}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                      <span>
                        Key length:{" "}
                        <strong className="text-slate-300">
                          {item.charCount} chars
                        </strong>
                      </span>
                      <span>•</span>
                      <span>Modified: {item.updated}</span>
                    </div>
                  </div>
                </div>

                {/* Password preview & action pills */}
                <div className="flex items-center justify-between gap-2 border-t border-slate-800/50 pt-2 sm:border-0 sm:pt-0">
                  <div className="flex items-center gap-1 rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1 font-mono text-xs text-slate-300">
                    <span>
                      {isVisible
                        ? "vK8#mQ2$xL9!pT4@"
                        : "••••••••••••••••"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleVisible(item.id)}
                      className="ml-1 text-slate-400 hover:text-slate-200"
                      title={isVisible ? "Mask password" : "Reveal preview password"}
                      aria-label="Toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-700"
                    title="Simulate password copy"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Health status bar */}
        <div className="mt-4 flex flex-col items-start justify-between gap-2 rounded-xl border border-slate-800/80 bg-slate-900/30 p-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] text-slate-300">
              Web Crypto Entropy: CSPRNG Ready
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            AES-256-GCM Engine · Week 3 Architecture
          </span>
        </div>
      </div>
    </div>
  );
}
