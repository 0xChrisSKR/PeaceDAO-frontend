/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    // 避免瀏覽器端解析 pino-pretty
    config.resolve.alias['pino-pretty'] = false;
    return config;
  }
};
export default nextConfig;
