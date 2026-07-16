/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  cacheComponents: true,
  images: {
    // Recipe images are served directly from S3 via a custom loader, bypassing
    // Next's image optimizer entirely (keeps image CPU/traffic off the VPS).
    loader: 'custom',
    loaderFile: './image-loader.js',
    // Widths the loader can resolve to pre-generated S3 renditions. Must match
    // RENDITION_WIDTHS in api/src/imageProcessing.ts and image-loader.js.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [96, 384],
  },
};

module.exports = nextConfig;
