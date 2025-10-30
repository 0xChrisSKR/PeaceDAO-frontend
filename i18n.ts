// i18n.ts
export const LOCALES = ['en', 'zh'] as const;

const i18nConfig = {
  locales: [...LOCALES],
  // ❌ 不要放 defaultLocale，這個交由 next.config.mjs 管
  localeDetection: true, // 這裡可以保留 true（給 next-i18next 自己用）
  fallbackLng: 'en',
};

export default i18nConfig;