/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { instrumentationHook: false },
  webpack: (config/*, { isServer, webpack }*/) => {
    return config;
  },
};
export default nextConfig;
