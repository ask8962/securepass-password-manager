import Link from "next/link";
import { Lock, Shield, KeyRound, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Section 1: Navigation */}
      <Header />

      <main className="flex-1">
        {/* Section 2: Hero */}
        <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Your passwords. One secure place.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
              Generate strong passwords and manage your credentials with SecurePass.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Get Started
              </Link>
              <Link
                href="/generator"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-card-border bg-card-bg px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted-light"
              >
                Try Password Generator
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section id="features" className="border-t border-card-border bg-card-bg px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col rounded-xl border border-card-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted-light text-foreground">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  <span className="rounded-full bg-muted-light px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Secure Password Vault
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Keep your passwords organized in one place.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col rounded-xl border border-card-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted-light text-foreground">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <span className="rounded-full bg-muted-light px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Two-Factor Authentication
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Add another layer of protection to your account.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col rounded-xl border border-card-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted-light text-foreground">
                    <KeyRound className="h-5 w-5 text-accent" />
                  </div>
                  <span className="rounded-full bg-muted-light px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    Available
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Password Generator
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Create strong, unique passwords in seconds.
                </p>
                <div className="mt-4 pt-2">
                  <Link
                    href="/generator"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    <span>Use generator</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: About */}
        <section className="border-t border-card-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-lg font-semibold text-foreground">
              About SecurePass
            </h2>
            <p className="mt-3 text-sm text-muted">
              SecurePass is a B.Tech final-year project developed by Group G195 at GLA University, Mathura.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/ask8962/securepass-password-manager"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-accent hover:underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Section 5: Footer */}
      <Footer />
    </div>
  );
}
