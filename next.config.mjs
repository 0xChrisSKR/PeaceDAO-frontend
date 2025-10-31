/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "pino-pretty": false,
      "pino-abstract-transport": false,
      "sonic-boom": false,
      "encoding": false
    };
    return config;
  }
};

module.exports = nextConfig;
