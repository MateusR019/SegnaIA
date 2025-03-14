/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  env: {
    SHEET_URL: process.env.SHEET_URL,
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 