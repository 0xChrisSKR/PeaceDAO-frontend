'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/** 本檔自給自足，不再從 "@/lib/i18n" 匯入任何型別或常數 */
type Locale = 'zh' | 'en';

const DEFAULT_LOCALE: Locale =
  (typeof window !== 'undefined' && (localStorage.getItem('lang') as Locale)) || 'zh';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

/** 簡易語系 Context（只負責保存/切換語言，不處理字典） */
const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  toggle: () => {},
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
      toggle: () => setLocale((prev) => (prev === 'zh' ? 'en' : 'zh')),
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** 其他元件可用這個 hook 取得/切換語言 */
export function useLanguage() {
  return useContext(LanguageContext);
}
