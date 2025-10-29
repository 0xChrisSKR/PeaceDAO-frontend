import { UserConfig } from 'next-i18next';

export const LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

const i18nConfig: UserConfig = {
  i18n: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    // Next.js 14 schema：只有禁用時才需要顯式設定；設定 true 會出現 "expected false" 的警告
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

export default i18nConfig;
