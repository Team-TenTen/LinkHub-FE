/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['linkhub-s3.s3.ap-northeast-2.amazonaws.com'],
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

module.exports = nextConfig
