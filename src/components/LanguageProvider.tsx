'use client';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { DEFAULT_LOCALE, getDictionary, type Dictionary } from '../lib/i18n';

type Locale = 'zh' | 'en';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  toggle: () => {},
  dictionary: getDictionary(DEFAULT_LOCALE),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(
    (typeof window !== 'undefined' && (localStorage.getItem('lang') as Locale)) || DEFAULT_LOCALE
  );

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggle: () => setLocale((p) => (p === 'zh' ? 'en' : 'zh')),
      dictionary: getDictionary(locale),
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
