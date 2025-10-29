/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Patch async-storage (mobile only) and pino-pretty (CLI only)
    config.resolve.alias['@react-native-async-storage/async-storage'] = require.resolve('core-js/features/promise');
    config.resolve.alias['pino-pretty'] = false;
    return config;
  },
  images: {
    remotePatterns: [],
  },
  // Safe default for i18n (Next.js native i18n, not next-i18next)
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = nextConfig;
