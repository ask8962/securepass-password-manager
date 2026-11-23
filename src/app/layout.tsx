import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePass — Secure Password Manager",
  description:
    "A secure password manager with two-factor authentication (2FA). Built as a B.Tech CSE Final Year Project by Group G195.",
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {props.children}
      </body>
    </html>
  );
}
