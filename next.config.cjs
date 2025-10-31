// next.config.cjs
/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  webpack: (config, { isServer }) => {
    // 把可選相依改成空模組，解 pino-pretty 打包錯誤
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
    return config
  }
}

module.exports = nextConfig
