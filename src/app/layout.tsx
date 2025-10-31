import type { Metadata } from "next";
import "./globals.css";
import Web3Providers from "@/providers/Web3Providers";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "WorldPeace DAO",
  description: "Decentralized fundraising & governance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body suppressHydrationWarning>
        <Web3Providers>
          <QueryProvider>
            {children}
          </QueryProvider>
        </Web3Providers>
      </body>
    </html>
  );
}
