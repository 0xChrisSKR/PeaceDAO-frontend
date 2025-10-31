import type { Metadata } from "next";
import "./globals.css";
import Web3Providers from "@/providers/Web3Providers";

export const metadata: Metadata = {
  title: "WorldPeace DAO",
  description: "Decentralized fundraising & governance"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body suppressHydrationWarning>
        <Web3Providers>
          {children}
        </Web3Providers>
      </body>
    </html>
  );
}
