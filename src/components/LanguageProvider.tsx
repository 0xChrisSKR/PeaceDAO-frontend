'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Locale = 'zh' | 'en';
const DEFAULT_LOCALE: Locale =
  (typeof window !== 'undefined' && (localStorage.getItem('lang') as Locale)) || 'zh';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  toggle: () => {}
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggle: () => setLocale((prev) => (prev === 'zh' ? 'en' : 'zh'))
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
