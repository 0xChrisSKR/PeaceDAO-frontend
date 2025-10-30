import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Web3Providers } from "@/providers/wagmi";
import { Toast } from "@/components/Toast";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { NetworkWatcher } from "@/components/NetworkWatcher";
import { DOVE_ICON_DATA_URL } from "@/lib/branding";
import { resolveLocale } from "@/lib/i18n";

const title = "World Peace DAO";
const description = "Mobile-first World Peace DAO DApp for transparent BNB donations.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description,
  icons: {
    icon: DOVE_ICON_DATA_URL
  },
  openGraph: {
    title,
    description
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const lang = resolveLocale(cookieStore.get("lang")?.value);
  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"}>
      <body className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-emerald-50 text-slate-900">
        <Web3Providers>
          <LanguageProvider initialLocale={lang}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <SiteNav />
              <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                <NetworkWatcher />
                {children}
              </main>
              <SiteFooter />
            </div>
            <Toast />
          </LanguageProvider>
        </Web3Providers>
      </body>
    </html>
  );
}
