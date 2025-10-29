"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getNamespace, translations, type Locale, type Namespace, type TranslationRecord } from "@/locales";

const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "peacedao.locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
};

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function translate(locale: Locale, namespace: Namespace, key: string): string | undefined {
  const localeNamespace = getNamespace(locale, namespace);
  if (localeNamespace && key in localeNamespace) {
    return (localeNamespace as TranslationRecord)[key];
  }
  const fallbackNamespace = getNamespace(DEFAULT_LOCALE, namespace);
  if (fallbackNamespace && key in fallbackNamespace) {
    return (fallbackNamespace as TranslationRecord)[key];
  }
  return undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in translations) {
      setLocaleState(stored as Locale);
      return;
    }
    const navigatorLanguage = window.navigator.language.toLowerCase();
    if (navigatorLanguage.startsWith("zh")) {
      setLocaleState("zh");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
      window.dispatchEvent(new CustomEvent("peacedao:localechange", { detail: locale }));
    }
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    if (!(nextLocale in translations)) return;
    setLocaleState(nextLocale);
  };

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function translateKey(locale: Locale, namespace: Namespace, key: string, fallback?: string) {
  return translate(locale, namespace, key) ?? fallback ?? key;
}
