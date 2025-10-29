const path = require("path");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack: (config) => {
    // 🔧 Ignore React Native & CLI-only modules that break SSR builds
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@react-native-async-storage/async-storage"] = require.resolve("core-js/features/promise");
    config.resolve.alias["pino-pretty"] = false;
    config.resolve.alias["pino-abstract-transport"] = false;
    config.resolve.alias["sonic-boom"] = false;
    return config;
  },
  images: { unoptimized: true },
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    localeDetection: false
  }
};

module.exports = nextConfig;
