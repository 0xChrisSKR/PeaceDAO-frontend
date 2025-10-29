"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import i18nConfig, { Locale, SUPPORTED_LOCALES } from "../../i18n";
import enCommon from "../../public/locales/en/common.json";
import zhCommon from "../../public/locales/zh/common.json";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function normalizeLocale(value?: string | null): Locale | undefined {
  if (!value) return undefined;
  const base = value.split(/[\-_]/)[0]?.toLowerCase();
  if (!base) return undefined;
  return SUPPORTED_LOCALES.find((locale) => locale === base) as Locale | undefined;
}

function detectInitialLocale(): Locale {
  const fallback = (i18nConfig.defaultLocale as Locale) ?? SUPPORTED_LOCALES[0];
  if (typeof window === "undefined") {
    return fallback;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const queryLocale = normalizeLocale(searchParams.get("lng"));
  if (queryLocale) return queryLocale;

  const storedLocale = normalizeLocale(window.localStorage.getItem("peacedao-locale"));
  if (storedLocale) return storedLocale;

  const cookieLocale = normalizeLocale(
    document.cookie
      .split(";")
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith("NEXT_LOCALE="))
      ?.split("=")[1]
  );
  if (cookieLocale) return cookieLocale;

  const navigatorLocale = normalizeLocale(window.navigator.language ?? window.navigator.languages?.[0]);
  if (navigatorLocale) return navigatorLocale;

  return fallback;
}

function createI18nInstance(initialLocale: Locale): I18nInstance {
  const instance = createInstance();
  instance.use(initReactI18next);
  instance.init({
    ...i18nConfig,
    lng: initialLocale,
    resources: {
      en: { common: enCommon },
      zh: { common: zhCommon }
    }
  });
  return instance;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within an I18nProvider");
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export function I18nProvider({ children }: Props) {
  const fallbackLocale = (i18nConfig.defaultLocale as Locale) ?? SUPPORTED_LOCALES[0];
  const [locale, setLocaleState] = useState<Locale>(fallbackLocale);
  const [i18n] = useState<I18nInstance>(() => createI18nInstance(fallbackLocale));

  useEffect(() => {
    const detected = detectInitialLocale();
    if (detected !== locale) {
      setLocaleState(detected);
    }
  }, [locale]);

  useEffect(() => {
    i18n.changeLanguage(locale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("peacedao-locale", locale);
      const url = new URL(window.location.href);
      url.searchParams.set("lng", locale);
      window.history.replaceState({}, "", url.toString());
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${maxAge}`;
    }
  }, [i18n, locale]);

  const handleSetLocale = useCallback(
    (value: Locale) => {
      setLocaleState((current) => (current === value ? current : value));
    },
    []
  );

  const contextValue = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale: handleSetLocale }),
    [handleSetLocale, locale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  );
}
