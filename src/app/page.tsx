import Link from "next/link";
import {
  Lock,
  KeyRound,
  ShieldAlert,
  Cpu,
  ArrowRight,
  Database,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import VaultPreview from "@/components/VaultPreview";

const features = [
  {
    icon: Lock,
    title: "Client-Side Zero-Knowledge Encryption",
    category: "Cryptographic Core",
    description:
      "All credential encryption and decryption routines execute strictly within your local browser runtime. Plaintext secrets and master passphrases never touch remote servers.",
    statusBadge: "Planned · Week 3",
    isPlanned: true,
  },
  {
    icon: KeyRound,
    title: "Cryptographic Entropy Generator",
    category: "Entropy & Randomness",
    description:
      "Generates cryptographically unpredictable passphrases using the browser's hardware-backed crypto.getRandomValues API with configurable character sets and length up to 128 chars.",
    statusBadge: "Operational · Week 1",
    isPlanned: false,
  },
  {
    icon: ShieldAlert,
    title: "Time-Based 2FA Multi-Factor Auth",
    category: "Identity Protection",
    description:
      "Hardware-synchronous TOTP verification adhering strictly to RFC 6238 specifications, ensuring vault authorization requires both master passphrase and ephemeral one-time tokens.",
    statusBadge: "Planned · Week 5",
    isPlanned: true,
  },
  {
    icon: Database,
    title: "Zero-Knowledge Cloud Synchronization",
    category: "Cloud Persistence",
    description:
      "Cloud state backed by Firebase Firestore storing exclusively authenticated ciphertext payloads, ensuring data integrity across devices without exposing secrets to database administrators.",
    statusBadge: "Planned · Week 2",
    isPlanned: true,
  },
  {
    icon: Cpu,
    title: "In-Memory Isolation & Auto-Lock",
    category: "Runtime Security",
    description:
      "Decrypted secrets exist transiently in isolated component memory states and are purged upon inactivity timeouts, browser tab termination, or explicit user sign-out.",
    statusBadge: "Planned · Week 6",
    isPlanned: true,
  },
  {
    icon: FileCode2,
    title: "Transparent Academic Engineering",
    category: "Architecture & Verification",
    description:
      "Every encryption primitive, validation pathway, and network transaction is documented for academic auditability as part of GLA University Capstone Group G195.",
    statusBadge: "Documented · Week 1",
    isPlanned: false,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Split-Layout Hero Section */}
        <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Left Column: Product Information */}
              <div className="lg:col-span-6 xl:col-span-6">
                {/* Academic Context Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-semibold text-slate-200">
                    B.Tech Final Year Capstone
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="font-mono text-slate-400">GLA Group G195</span>
                </div>

                {/* Concise Product Headline */}
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Client-side encrypted password security.
                </h1>

                {/* Subtitle / Product description */}
                <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                  SecurePass is a zero-knowledge password manager engineered to
                  derive encryption keys directly in the client runtime. Protect
                  credentials with hardware-backed randomness, multi-factor
                  authentication, and verified cryptographic primitives.
                </p>

                {/* Action buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-xs font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35 focus:ring-2 focus:ring-blue-400"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Launch Vault Prototype</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/generator"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-700 hover:bg-slate-800 focus:ring-2 focus:ring-slate-700"
                  >
                    <KeyRound className="h-4 w-4 text-blue-400" />
                    <span>Test Password Generator</span>
                  </Link>
                </div>

                {/* Technical Guarantees Pills */}
                <div className="mt-8 border-t border-slate-800/80 pt-6">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Engineering Specifications
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/80 bg-slate-900/50 px-2.5 py-1 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                      Web Crypto CSPRNG
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/80 bg-slate-900/50 px-2.5 py-1 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                      Client-Side Key Derivation
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-800/80 bg-slate-900/50 px-2.5 py-1 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                      Zero Plaintext Transmission
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic Vault Preview */}
              <div id="preview" className="lg:col-span-6 xl:col-span-6">
                <VaultPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture & Feature Showcase */}
        <section id="features" className="border-t border-card-border-subtle bg-slate-950/40 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                  System Architecture
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Engineered for Zero-Knowledge Defense
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                  SecurePass splits functionality between local cryptographic
                  execution and secure remote cloud synchronization to guarantee
                  confidentiality under adversarial network assumptions.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Week 1 Milestone Completed</span>
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Security Model & Roadmap Spec */}
        <section id="security-model" className="border-t border-card-border-subtle px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Cryptographic Threat Model
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    Client-Side Cryptography Pipeline
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
                    In our approved architecture, cloud storage providers are
                    treated as untrusted commodity infrastructure. Data
                    invariants guarantee that neither database compromises nor
                    intermediary proxies reveal plaintext credentials.
                  </p>

                  <div className="mt-6 space-y-3 font-mono text-xs">
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-slate-300">
                      <p className="text-slate-500"># Key Derivation (Week 3)</p>
                      <p className="mt-1 text-blue-400">
                        Passphrase + Salt → PBKDF2 (SHA-256) → AES-256 Key
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-slate-300">
                      <p className="text-slate-500"># Payload Encryption (Week 4)</p>
                      <p className="mt-1 text-emerald-400">
                        Plaintext + IV + AES-Key → AES-GCM (Auth Ciphertext)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Weekly Implementation Progress (Supervisor Review)
                  </h4>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3 rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-3 text-xs">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-emerald-200">
                            Week 1 (Nov 23–29, 2026) — Completed
                          </strong>
                          <span className="rounded bg-emerald-900/60 px-1.5 py-0.2 text-[10px] text-emerald-300">
                            Verified
                          </span>
                        </div>
                        <p className="mt-1 text-slate-400">
                          Next.js 16 foundation, landing page with vault preview,
                          authentication interface with validation, dashboard UI,
                          CSPRNG password generator, and academic documentation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs">
                      <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-blue-500/40 text-center font-mono text-[10px] leading-tight text-blue-400">
                        2
                      </div>
                      <div>
                        <strong className="text-slate-200">
                          Week 2 — Firebase Integration & Database Schema
                        </strong>
                        <p className="mt-1 text-slate-400">
                          Firebase Auth configuration, user session state, and
                          Firestore encrypted blob schema definitions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs">
                      <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-slate-700 text-center font-mono text-[10px] leading-tight text-slate-500">
                        3
                      </div>
                      <div>
                        <strong className="text-slate-300">
                          Week 3 — Master Passphrase & Client-Side Encryption
                        </strong>
                        <p className="mt-1 text-slate-400">
                          Client-side PBKDF2 key derivation and AES-256-GCM unit
                          test suites.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs">
                      <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-slate-700 text-center font-mono text-[10px] leading-tight text-slate-500">
                        4
                      </div>
                      <div>
                        <strong className="text-slate-300">
                          Week 4 — Encrypted Credential CRUD Operations
                        </strong>
                        <p className="mt-1 text-slate-400">
                          Live vault unlock, encrypted record creation, updating,
                          and deletion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Project Context */}
        <section id="academic" className="border-t border-card-border-subtle bg-slate-950/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Academic Project Profile
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                GLA University Capstone Group G195
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                Developed in partial fulfillment of the requirements for the Bachelor of
                Technology degree in Computer Science & Engineering.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Lead & Architecture
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  Anukalp Gupta
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Project integration, cryptography specs, and repo management.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Frontend & Design
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  Nishant Singh
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  UI component engineering and responsive accessibility.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Auth & Services
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  Dileep Bhardwaj
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Authentication flows and Firebase cloud service integration.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Security Features
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  Ayushmaan Gupta
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Entropy generation, strength metrics, and security edge cases.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  QA & Documentation
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  Utpal Kumar
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Verification checklists, mentor review reports, and defect logs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Bar */}
        <section className="border-t border-card-border-subtle px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center sm:p-12">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Inspect the SecurePass Prototype
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              Review our Week 1 implementation locally or generate a strong
              cryptographic password. All generation takes place in your browser.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/30 transition-all hover:bg-blue-500"
              >
                <Lock className="h-4 w-4" />
                <span>Open Dashboard</span>
              </Link>
              <Link
                href="/generator"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800"
              >
                <KeyRound className="h-4 w-4 text-blue-400" />
                <span>Password Generator</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
