const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.radshid.com/api/v1/:path*', 
      },
    ]
  },
  i18n,
  reactStrictMode: true,
};

module.exports = nextConfig;
