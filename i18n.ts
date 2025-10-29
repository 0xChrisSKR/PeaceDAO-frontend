// i18n.ts
import type { UserConfig } from 'next-i18next';

export const LOCALES = ['en', 'zh'] as const;

const i18nConfig: UserConfig = {
  locales: [...LOCALES],
  // ❌ 不要放 defaultLocale，這個交由 next.config.mjs 管
  localeDetection: true, // 這裡可以保留 true（給 next-i18next 自己用）
  fallbackLng: 'en',
};

export default i18nConfig;