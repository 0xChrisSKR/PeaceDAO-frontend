/** @type {import('next-i18next').UserConfig} */
const i18nConfig = {
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    // Next.js 只接受 false；或移除此行。為了避免 Vercel 警告，設 false。
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
module.exports = i18nConfig;
