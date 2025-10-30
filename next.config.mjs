/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    // 之前的錯誤訊息要求此值應為布林且通常設為 false
    localeDetection: false
  },
  webpack: (config) => {
    // 修避不需要的 Node-only 模組，避免「pino-pretty」和 RN async-storage 導入報錯
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['pino-pretty'] = false;
    config.resolve.alias['@react-native-async-storage/async-storage'] = false;
    return config;
  }
};
export default nextConfig;
