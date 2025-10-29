import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { NetworkGuard } from "@/components/NetworkGuard";
import { I18nProvider } from "@/providers/I18nProvider";
import { WagmiProvider } from "@/providers/wagmi";
import i18nConfig from "../../i18n";

export const metadata: Metadata = {
  title: "PeaceDAO DApp",
  description: "Donate and swap with PeaceDAO"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={(i18nConfig.defaultLocale as string) ?? "en"}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <WagmiProvider>
          <I18nProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8">
                <NetworkGuard />
                {children}
              </main>
              <Footer />
            </div>
            <Toast />
          </I18nProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
