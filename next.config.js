const path = require("path");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack: (config, { isServer }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
      // Stub RN storage (MetaMask SDK tries to require it)
      '@react-native-async-storage/async-storage': require.resolve('./src/shims/empty.js'),
      // Disable server-only logger pretty-printer in client bundles
      'pino-pretty': false,
      'pino-abstract-transport': false,
      'sonic-boom': false
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'react-native': false,
        '@react-native-async-storage/async-storage': false
      };
    }

    return config;
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    localeDetection: false
  }
};

module.exports = nextConfig;
