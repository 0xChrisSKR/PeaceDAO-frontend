/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@wagmi/core': false,
      '@web3modal/wagmi': false,
      'viem': false
    };
    return config;
  }
};
export default nextConfig;
