import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WagmiProvider } from "@/providers/wagmi";
import { Toast } from "@/components/Toast";
import { NetworkGuard } from "@/components/NetworkGuard";
import { twitterHandle, twitterUrl } from "@/lib/twitter";
import { XIcon } from "@/components/icons/XIcon";

export const metadata: Metadata = {
  title: "PeaceDAO DApp",
  description: "Donate and swap with PeaceDAO",
  openGraph: {
    title: "PeaceDAO DApp",
    description: "Donate and swap with PeaceDAO",
    url: twitterUrl,
    siteName: "PeaceDAO",
    type: "website"
  },
  twitter: {
    card: "summary",
    site: twitterHandle,
    creator: twitterHandle,
    title: "PeaceDAO DApp",
    description: "Donate and swap with PeaceDAO"
  }
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
            <footer className="border-t border-slate-800 bg-slate-950/60 py-6 text-sm text-slate-400">
              <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center">
                <p>Built with love by PeaceDAO contributors.</p>
                <Link
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Follow us on X ({twitterHandle})</span>
                  <span aria-hidden>{twitterHandle}</span>
                </Link>
              </div>
            </footer>
          </div>
          <Toast />
        </WagmiProvider>
      </body>
    </html>
  );
}
