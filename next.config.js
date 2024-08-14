/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins')

const withPWA = require('next-pwa')({
  dest: 'public',
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  compress: true,
})

const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 1 * 60 * 60 * 24 * 365,
    domains: ['linkhub-s3.s3.ap-northeast-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linkhub-s3.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/kakaoLogin',
        destination: `${process.env.NEXT_PUBLIC_API_ADDRESS}/oauth2/authorization/kakao`,
        permanent: true,
      },
      {
        source: '/oauth2/redirection/kakao(.*)',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}

module.exports = withPlugins([[withBundleAnalyzer], [withPWA]], nextConfig)
