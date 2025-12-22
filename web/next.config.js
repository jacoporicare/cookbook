/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    dangerouslyAllowLocalIP: process.env.API_URL.startsWith('http://localhost'),
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'zradelnik.cz',
      },
    ],
  },
};

module.exports = nextConfig;
