/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    // Next.js 的多語系設定放這裡
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
    // 依照 Vercel 日誌要求，這裡必須是 false
    localeDetection: false,
  },
  webpack: (config) => {
    // 關閉只在原生/Node 用得到的套件，避免 web bundle 把它們打進來
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
      'pino-std-serializers': false,
      'sonic-boom': false,
    };
    return config;
  },
};

export default nextConfig;