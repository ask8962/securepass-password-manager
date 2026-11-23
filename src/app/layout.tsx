import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurePass — Password Manager with 2FA",
  description:
    "Generate strong passwords and manage your credentials with SecurePass. B.Tech final-year project developed by Group G195 at GLA University, Mathura.",
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {props.children}
      </body>
    </html>
  );
}
