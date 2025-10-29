import path from 'path';
import type { UserConfig } from 'next-i18next';

export const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },
  // 你的語系檔放在 public/locales/en/*.json, public/locales/zh/*.json
  localePath: path.resolve('./public/locales'),
  // 開發時自動 reload（正式環境自動關閉）
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

export default i18nConfig;
