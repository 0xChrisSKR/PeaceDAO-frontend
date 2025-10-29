import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { WagmiProvider } from "@/providers/wagmi";
import { Toast } from "@/components/Toast";
import { NetworkGuard } from "@/components/NetworkGuard";
import I18nProvider from "./i18n-provider";
import NextI18NextConfig from "../../next-i18next.config";
import { AppFooter } from "@/components/AppFooter";

export const metadata: Metadata = {
  title: "PeaceDAO DApp",
  description: "Donate and swap with PeaceDAO"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const cookieLang = cookieStore.get("lng")?.value;
  const defaultLocale = NextI18NextConfig.i18n?.defaultLocale ?? "zh";
  const supportedLocales = NextI18NextConfig.i18n?.locales ?? [defaultLocale];
  const lang = supportedLocales.includes(cookieLang ?? "") ? cookieLang! : defaultLocale;

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <I18nProvider>
          <WagmiProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8">
                <NetworkGuard />
                {children}
              </main>
              <AppFooter />
            </div>
            <Toast />
          </WagmiProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
