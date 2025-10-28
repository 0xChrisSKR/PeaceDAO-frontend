import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { WagmiProvider } from "@/providers/wagmi";
import { Toast } from "@/components/Toast";
import { NetworkGuard } from "@/components/NetworkGuard";

export const metadata: Metadata = {
  title: "PeaceDAO DApp",
  description: "Donate and swap with PeaceDAO"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <WagmiProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8">
              <NetworkGuard />
              {children}
            </main>
            <footer className="border-t border-slate-800 bg-slate-950/60 py-6 text-center text-sm text-slate-400">
              Built with love by PeaceDAO contributors.
            </footer>
          </div>
          <Toast />
        </WagmiProvider>
      </body>
    </html>
  );
}
