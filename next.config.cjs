/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pino-pretty': path.resolve(__dirname, 'src/shims/empty.js'),
      'pino-abstract-transport': false,
      'sonic-boom': false,
      encoding: false
    }
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false
      }
    }
    // ↓ 把 pino-pretty 的噪音壓掉
    config.ignoreWarnings = [
      { module: /pino\/lib\/tools\.js/, message: /pino-pretty/ }
    ]
    return config
  }
}

module.exports = nextConfig
