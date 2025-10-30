import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Web3Providers } from "@/providers/wagmi";

const SafeClientProvider = dynamic(() => import("@/providers/SafeClientProvider"), { ssr: false });

export const metadata: Metadata = {
  title: "World Peace DAO",
  description: "Token-verified chat & governance on BSC"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const langCookie = cookies().get("lang")?.value;

  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh bg-black text-zinc-100">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/assets/ui/hero-banner.svg')" }}
        />
        <SafeClientProvider>
          <Web3Providers>
            <LanguageProvider initialLocale={langCookie}>
              <Header />
              <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
            </LanguageProvider>
          </Web3Providers>
        </SafeClientProvider>
      </body>
    </html>
  );
}
