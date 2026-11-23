import Link from "next/link";
import { ShieldCheck, Terminal, GitBranch, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-card-border-subtle bg-slate-950/60 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">
                SecurePass
              </span>
              <span className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
                G195
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              A secure password manager demonstrating client-side zero-knowledge
              cryptography, two-factor authentication, and robust access controls.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Terminal className="h-3.5 w-3.5 text-blue-400" />
              <span>B.Tech CSE Capstone Project · 2026</span>
            </div>
          </div>

          {/* Col 2: Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Architecture Spec
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Web Crypto API (RNG)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                AES-256-GCM (Planned W3)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                RFC 6238 TOTP (Planned W5)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Zero-Knowledge Storage
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Team */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Project Team (G195)
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
              <li>Anukalp Gupta — Architecture & Integration</li>
              <li>Nishant Singh — UI Engineering</li>
              <li>Dileep Bhardwaj — Auth & Firebase</li>
              <li>Ayushmaan Gupta — Password Security</li>
              <li>Utpal Kumar — Verification & QA</li>
            </ul>
          </div>

          {/* Col 4: Institution & Repo */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Institutional Context
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              GLA University, Mathura
              <br />
              Department of Computer Science & Engineering
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://github.com/ask8962/securepass-password-manager"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 transition-colors hover:text-blue-300"
              >
                <GitBranch className="h-3.5 w-3.5" />
                <span>GitHub Repository</span>
              </a>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-slate-200"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Local Prototype Workspace</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-[11px] text-slate-400 sm:flex-row">
          <p>
            © 2026 SecurePass Group G195. Academic research prototype. No real
            credentials are saved or transmitted.
          </p>
          <p className="font-mono text-slate-400">
            Next.js 16 · React 19 · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
