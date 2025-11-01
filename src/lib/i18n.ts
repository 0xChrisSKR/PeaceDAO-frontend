'use client';
import { useState } from 'react';

export type Dictionary = Record<string, string>;
export const DEFAULT_LOCALE = 'zh';

const DICTS: Record<'zh' | 'en', Dictionary> = {
  zh: {
    connect: '連接錢包',
    disconnect: '斷開連接',
    connected: '已連接',
    wallet: '錢包',
    footerMsg: '為全球和平與透明而建。',
  },
  en: {
    connect: 'Connect Wallet',
    disconnect: 'Disconnect',
    connected: 'Connected',
    wallet: 'Wallet',
    footerMsg: 'Built with ❤️ for global peace and transparency.',
  },
};

export function getDictionary(locale: 'zh' | 'en'): Dictionary {
  return DICTS[locale] ?? DICTS[DEFAULT_LOCALE];
}

export function useI18n() {
  const [lang, setLang] = useState<'zh' | 'en'>(
    (typeof window !== 'undefined' && (localStorage.getItem('lang') as 'zh' | 'en')) || DEFAULT_LOCALE
  );
  const t = (key: string, fallback?: string) => DICTS[lang][key] ?? fallback ?? key;
  const toggle = () => {
    const next = lang === 'zh' ? 'en' : 'zh';
    setLang(next);
    if (typeof window !== 'undefined') localStorage.setItem('lang', next);
  };
  return { t, lang, toggle };
}
