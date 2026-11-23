import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePass — Zero-Knowledge Password Architecture",
  description:
    "A client-side encrypted password manager featuring two-factor authentication and cryptographically secure generation. B.Tech CSE Final Year Project Group G195, GLA University.",
  keywords: [
    "Password Manager",
    "Client-Side Encryption",
    "Two-Factor Authentication",
    "2FA",
    "Web Crypto API",
    "GLA University",
  ],
};

export const viewport: Viewport = {
  themeColor: "#080c14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground cyber-grid selection:bg-blue-600/30 selection:text-blue-200">
        {props.children}
      </body>
    </html>
  );
}
