import type { UserConfig } from 'next-i18next';

// 給程式內使用的語系清單（若需要）
export const LOCALES = ['en', 'zh-TW'] as const;

// 注意：這是 next-i18next 的設定，不要放 defaultLocale/locales/localeDetection
const i18nConfig: UserConfig = {
  fallbackLng: 'en',
  // 需要時可加：defaultNS、ns、reloadOnPrerender 等
};

export default i18nConfig;