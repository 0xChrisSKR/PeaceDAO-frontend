const path = require("path");
const { i18n } = require("./next-i18next.config");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack: (config, { isServer }) => {
    // 🔧 Ignore React Native & CLI-only modules that break SSR builds
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@react-native-async-storage/async-storage"] = require.resolve("core-js/features/promise");
    config.resolve.alias["pino-pretty"] = false;
    config.resolve.alias["pino-abstract-transport"] = false;
    config.resolve.alias["sonic-boom"] = false;
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        // 這些在瀏覽器端不需要，避免打包失敗
        "pino-pretty": false,
        "@react-native-async-storage/async-storage": false,
        bufferutil: false,
        "utf-8-validate": false
      };
    }
    return config;
  },
  images: { unoptimized: true },
  i18n
};

module.exports = nextConfig;
