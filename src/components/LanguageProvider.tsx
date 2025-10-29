"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, Dictionary, Locale, getDictionary, resolveLocale } from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  dictionary: getDictionary(DEFAULT_LOCALE),
  setLocale: () => {}
});

export function LanguageProvider({ initialLocale, children }: { initialLocale?: string; children: ReactNode }) {
  const normalized = resolveLocale(initialLocale ?? DEFAULT_LOCALE);
  const [locale, setLocale] = useState<Locale>(normalized);

  useEffect(() => {
    document.cookie = `lang=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dictionary: getDictionary(locale),
      setLocale
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
