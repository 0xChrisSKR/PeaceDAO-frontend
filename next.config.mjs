/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Next.js 的 i18n 設定應該放這裡
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    // 日誌顯示「expected false」，這裡請用 false（不要 true 或字串）
    localeDetection: false,
  },

  webpack: (config, { isServer }) => {
    // 只在瀏覽器端處理
    if (!isServer) {
      // 這些套件是行動/Node 端用的，前端 bundle 不需要，直接設成 false
      config.resolve.alias['@react-native-async-storage/async-storage'] = false;
      config.resolve.alias['pino-pretty'] = false;
      config.resolve.alias['pino'] = false;

      // 某些依賴會嘗試 require 這些 Node 核心模組，前端沒有 -> 關掉
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;