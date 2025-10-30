import webpack from 'webpack';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  i18n: { locales: ['en', 'zh'], defaultLocale: 'en', localeDetection: false },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, net: false, tls: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
      '@react-native-async-storage/async-storage': false,
    };
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    );
    return config;
  },
};
export default nextConfig;
