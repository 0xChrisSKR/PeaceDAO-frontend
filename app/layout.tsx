import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { Web3Providers } from "@/providers/wagmi";
import "./globals.css";

const SafeClientProvider = dynamic(
  () => import("../src/providers/SafeClientProvider"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "World Peace DAO",
  description: "PeaceDAO Frontend"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <SafeClientProvider>
          <Web3Providers>
            <div className="relative flex min-h-screen flex-col">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/ui/home-bg.svg')] bg-cover bg-fixed bg-center opacity-10" />
              <Header />
              <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-16 pt-10 md:px-8">
                {children}
              </main>
            </div>
          </Web3Providers>
        </SafeClientProvider>
      </body>
    </html>
  );
}
