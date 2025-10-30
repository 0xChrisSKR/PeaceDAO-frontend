/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false
  },
  webpack: (config) => {
    // 避免把 server 端模組打進瀏覽器
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false
    };
    // 避免 metamask/wagmi 在瀏覽器端報錯
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
      '@react-native-async-storage/async-storage': false
    };
    return config;
  }
};
export default nextConfig;
