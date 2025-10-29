import type { UserConfig } from 'next-i18next';

// 你要支援的語系（僅供程式內使用；真正的 Next 路由語系在 next.config.mjs）
export const LOCALES = ['en', 'zh'] as const;

const i18nConfig: UserConfig = {
  // 開發時想看載入翻譯的 debug 可以改成 true
  debug: false,

  // 開發模式下每次請求都重新載入翻譯檔
  reloadOnPrerender: process.env.NODE_ENV === 'development',

  // 沒命中語系時的後備語言
  fallbackLng: 'en',

  // 你的命名空間（預設放 common 就好；若之後加 page 專屬 namespace 再擴充）
  defaultNS: 'common',
  ns: ['common'],

  // 翻譯檔的路徑（若 public/locales 下有 zh/common.json、en/common.json）
  localePath:
    typeof window === 'undefined' ? 'public/locales' : 'locales',
};

export default i18nConfig;