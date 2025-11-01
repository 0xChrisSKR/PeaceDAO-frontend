import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldPeace DAO",
  description: "Decentralized fundraising & governance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
