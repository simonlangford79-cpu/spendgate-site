import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpendGate – Spend Control for Multi-Site Businesses",
  description: "Lightweight purchase request, approval, and buyer queue software for multi-site operators. Finance visibility before the invoice arrives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: "#ffffff", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
