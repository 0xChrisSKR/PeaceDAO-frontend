import type { UserConfig } from 'next-i18next';

export const LOCALES = ['en', 'zh'] as const;

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: LOCALES[0],
    locales: [...LOCALES],
    localeDetection: false, // Next.js 14 必須關閉
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
};

export default i18nConfig;
