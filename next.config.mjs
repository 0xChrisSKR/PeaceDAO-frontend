/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Next.js 14 只能接受 false；不要用 true／不要省略
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // ✅ 讓打包器忽略可選依賴（web 不需要）
  webpack: (config, { isServer }) => {
    // 避免 Node 專用模組在瀏覽器端被解析
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      net: false,
      tls: false,
    };

    // 這兩個是可選依賴，實際在瀏覽器端用不到
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pino-pretty': false,
      '@react-native-async-storage/async-storage': false,
    };

    return config;
  },
};

export default nextConfig;