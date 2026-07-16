// Custom next/image loader. Recipe image srcs are S3 prefixes
// (https://<bucket>/<key>); we map each requested width to a pre-generated
// WebP rendition file so the browser fetches finished bytes directly from S3 —
// Next's /_next/image optimizer never runs, keeping image traffic off the VPS.
//
// Widths MUST match the API's RENDITION_WIDTHS (api/src/imageProcessing.ts) and
// next.config's deviceSizes/imageSizes.
const RENDITION_WIDTHS = [96, 384, 640, 828, 1080, 1920];

export default function s3ImageLoader({ src, width }) {
  // Remote (S3) recipe images: pick the smallest rendition >= requested width.
  if (/^https?:\/\//.test(src)) {
    const rendition =
      RENDITION_WIDTHS.find((w) => w >= width) ??
      RENDITION_WIDTHS[RENDITION_WIDTHS.length - 1];
    return `${src}/${rendition}.webp`;
  }

  // Local/static assets (placeholder, logo): serve as-is, unoptimized.
  return src;
}
