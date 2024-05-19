/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-test.zradelnik.eu',
      },
    ],
  },
};

export default nextConfig;
