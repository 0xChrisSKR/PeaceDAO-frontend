module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    localeDetection: false
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
