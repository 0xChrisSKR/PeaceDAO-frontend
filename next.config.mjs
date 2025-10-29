/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false, // 必須為 false
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pino-pretty': false,
      '@react-native-async-storage/async-storage': false,
      'react-native-quick-base64': false,
      'thread-stream': false,
      'sonic-boom': false,
      'lokijs': false,
      'encoding': false,
      'bufferutil': false,
      'utf-8-validate': false,
      'fsevents': false,
      'canvas': false,
      'trezor-connect': false,
    };
    return config;
  },
};

export default nextConfig;
