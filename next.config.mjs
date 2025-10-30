/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { instrumentationHook: false },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  webpack: (config /*, { isServer, webpack }*/) => {
    return config;
  },
};
export default nextConfig;
