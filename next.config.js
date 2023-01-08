/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['schipkeditbucket.s3.ap-southeast-2.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'schipkeditbucket.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/images/',
      },
    ],
  },
};

module.exports = nextConfig;
