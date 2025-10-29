/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    // 只允許 boolean，且 Next 14 對該欄位只接受 `false`（或直接省略）
    localeDetection: false,
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
  webpack: (config) => {
    // 避免在瀏覽器端把 Node / RN 專用套件打進 bundle
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pino-pretty': false,
      '@react-native-async-storage/async-storage': false,
      'lokijs': false,
      'encoding': false,
      'worker_threads': false,
    };
    return config;
  },
  // 讓 Vercel 產出更獨立的產物（可選）
  output: 'standalone',
};

export default nextConfig;
