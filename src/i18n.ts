import type { UserConfig } from 'next-i18next';

export const i18nConfig: UserConfig = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false
  },
  defaultNS: 'common',
  fallbackLng: 'en'
};
