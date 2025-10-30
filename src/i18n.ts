import type { UserConfig } from 'next-i18next';

export const i18nConfig: UserConfig = {
  locales: ['en', 'zh'],
  defaultNS: 'common',
  fallbackLng: 'en',
  localeDetection: false
};
