import type { AppContext, AppProps } from "next/app";
import App from "next/app";

import "@/app/globals.css";

import { Web3Providers } from "@/providers/wagmi";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Toast } from "@/components/Toast";
import { NetworkWatcher } from "@/components/NetworkWatcher";
import { Locale, resolveLocale } from "@/lib/i18n";

interface PeaceDaoAppProps extends AppProps {
  initialLocale?: Locale;
}

function MyApp({ Component, pageProps, initialLocale }: PeaceDaoAppProps) {
  return (
    <Web3Providers>
      <LanguageProvider initialLocale={initialLocale}>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-sky-50 to-emerald-50 text-slate-900">
          <SiteNav />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <NetworkWatcher />
            <Component {...pageProps} />
          </main>
          <SiteFooter />
        </div>
        <Toast />
      </LanguageProvider>
    </Web3Providers>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookieHeader = appContext.ctx.req?.headers.cookie;
  if (!cookieHeader) {
    return { ...appProps };
  }
  const match = cookieHeader.match(/(?:^|;\s*)lang=([^;]+)/);
  if (!match) {
    return { ...appProps };
  }
  try {
    const locale = resolveLocale(decodeURIComponent(match[1] ?? ""));
    return { ...appProps, initialLocale: locale };
  } catch (error) {
    return { ...appProps };
  }
};

export default MyApp;
