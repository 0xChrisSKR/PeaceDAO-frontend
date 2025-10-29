const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': require.resolve('core-js/features/promise'),
      'pino-pretty': false,
      'pino-abstract-transport': false,
      'sonic-boom': false
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'react-native': false
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
