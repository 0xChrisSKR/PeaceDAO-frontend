"use client";

import env from "@/config/env";
import { useLanguage } from "@/components/LanguageProvider";

const WHITEPAPER_URL = "https://github.com/PeaceDAO/PeaceDAO-frontend/blob/main/docs/WHITEPAPER.md";

export function SiteFooter() {
  const { dictionary } = useLanguage();

  return (
    <footer className="mt-16 border-t border-white/50 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>{dictionary.footer.rights}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          <a href={env.twitter} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">
            {dictionary.footer.twitter}
          </a>
          <a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">
            {dictionary.footer.docs}
          </a>
        </div>
      </div>
    </footer>
  );
}
