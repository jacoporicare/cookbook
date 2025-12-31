/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    dangerouslyAllowLocalIP:
      process.env.API_URL?.startsWith('http://localhost'),
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'zradelnik.cz',
      },
      {
        protocol: 'https',
        hostname: 'api.zradelnik.cz',
      },
    ],
  },
};

module.exports = nextConfig;
