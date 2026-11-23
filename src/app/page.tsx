import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";

const features = [
  {
    icon: "🔒",
    title: "Encrypted Vault",
    description:
      "Store your credentials with client-side encryption. Your master passphrase never leaves your device.",
  },
  {
    icon: "🔑",
    title: "Two-Factor Authentication",
    description:
      "Add a second layer of security with TOTP-based 2FA to protect your vault from unauthorized access.",
  },
  {
    icon: "⚡",
    title: "Password Generator",
    description:
      "Generate strong, cryptographically secure passwords with customizable length and character options.",
  },
  {
    icon: "🛡️",
    title: "Security Analysis",
    description:
      "Get real-time strength analysis and breach detection alerts for your stored passwords.",
  },
  {
    icon: "☁️",
    title: "Cloud Sync",
    description:
      "Securely sync your encrypted vault across devices using Firebase cloud infrastructure.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description:
      "Access your password manager from any device with a fully responsive, modern interface.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-4 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              B.Tech CSE Final Year Project — Group G195
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your Passwords,{" "}
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Secured
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              SecurePass is a modern password manager built with client-side
              encryption and two-factor authentication. Manage your credentials
              securely, generate strong passwords, and stay protected.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-12 items-center rounded-lg bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center rounded-lg border border-card-border px-8 text-sm font-medium text-foreground transition-colors hover:bg-card-bg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t border-card-border px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Everything You Need
              </h2>
              <p className="mx-auto max-w-2xl text-muted">
                SecurePass combines industry-standard security practices with a
                clean, intuitive interface designed for everyday use.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t border-card-border px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              About the Project
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-muted">
              SecurePass is developed as a B.Tech Computer Science and Engineering
              final-year project at GLA University, Mathura. Our team of five
              students is building a production-quality password manager that
              demonstrates modern web development, cryptography, and secure
              authentication practices.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-card-border bg-card-bg p-6">
                <p className="text-3xl font-bold text-accent">5</p>
                <p className="mt-1 text-sm text-muted">Team Members</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card-bg p-6">
                <p className="text-3xl font-bold text-accent">G195</p>
                <p className="mt-1 text-sm text-muted">Project Group</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card-bg p-6">
                <p className="text-3xl font-bold text-accent">2FA</p>
                <p className="mt-1 text-sm text-muted">Secure Auth</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-card-border px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Ready to Secure Your Passwords?
            </h2>
            <p className="mb-8 text-muted">
              Create your account and start managing your credentials safely.
            </p>
            <Link
              href="/register"
              className="inline-flex h-12 items-center rounded-lg bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
