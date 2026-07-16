import sharp from 'sharp';

import {
  deleteImagePrefix,
  deleteObject,
  getObjectBuffer,
  headObject,
  originalObjectKey,
  permanentImageKey,
  putObject,
  stagingObjectKey,
} from './s3';

// Fixed WebP widths generated per image. The browser picks one from srcset via
// the custom next/image loader, so these must stay in sync with the loader's
// list (web/image-loader.js) and next.config's deviceSizes/imageSizes. Largest
// is 1920 — the detail lightbox is the biggest consumer at ~1200 device px, so
// 1920 covers hi-DPI while staying far smaller than a raw phone photo.
export const RENDITION_WIDTHS = [96, 384, 640, 828, 1080, 1920] as const;
const WEBP_QUALITY = 80;

// Square JPEG used by Android push notifications (see resolvers.ts).
const PUSH_SIZE = 1080;

// Upload guards (the old multer path capped at 10MB; a presigned PUT has no
// cap, so enforce it here before we ever buffer/decode the object). The pixel
// cap defends against decompression bombs on the small VM.
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const MAX_INPUT_PIXELS = 60_000_000; // ~60MP

const ALLOWED_CONTENT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/avif',
  'image/tiff',
]);

// Keep each Sharp pipeline single-threaded and bound how many promotions decode
// at once, so a burst of saves can't run several large decodes in parallel and
// exhaust memory/CPU on the small VM.
sharp.concurrency(1);
const MAX_CONCURRENT = 2;
let active = 0;
const queue: (() => void)[] = [];

function acquire(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active += 1;
    return Promise.resolve();
  }
  return new Promise((resolve) => queue.push(resolve));
}

function release() {
  const next = queue.shift();
  if (next) {
    next();
  } else {
    active -= 1;
  }
}

export function isAllowedContentType(contentType: string) {
  return ALLOWED_CONTENT_TYPES.has(contentType.toLowerCase());
}

export function pushJpegObjectKey(key: string) {
  return `${key}/${PUSH_SIZE}x${PUSH_SIZE}.jpg`;
}

export function webpObjectKey(key: string, width: number) {
  return `${key}/${width}.webp`;
}

// Generate every rendition from the original and upload them under `<key>/`.
// `.rotate()` bakes in EXIF orientation before resizing (and, with no
// withMetadata(), the outputs carry no EXIF/GPS). Widths larger than the source
// are not upscaled, so a small original just yields identical bytes at the
// capped widths — harmless and keeps the URL set uniform across all images.
export async function generateAndUploadRenditions(
  key: string,
  original: Buffer,
) {
  await acquire();
  try {
    for (const width of RENDITION_WIDTHS) {
      const buffer = await sharp(original, {
        limitInputPixels: MAX_INPUT_PIXELS,
      })
        .rotate()
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();
      await putObject(webpObjectKey(key, width), buffer, 'image/webp');
    }

    const pushJpeg = await sharp(original, {
      limitInputPixels: MAX_INPUT_PIXELS,
    })
      .rotate()
      .resize(PUSH_SIZE, PUSH_SIZE, { fit: 'cover' })
      .jpeg({ mozjpeg: true })
      .toBuffer();
    await putObject(pushJpegObjectKey(key), pushJpeg, 'image/jpeg');
  } finally {
    release();
  }
}

// Promote a staged upload to a permanent image: validate the original, store it
// privately under `<key>/original`, generate all renditions, and delete the
// staging object. Idempotent — if the renditions already exist (e.g. a retried
// save), it is a no-op. Throws if the staging upload is missing/expired, too
// large, or not a decodable image; on a bad image the staging object is removed.
// Returns the permanent image key (`images/<id>`) to store in recipe.image.
export async function promoteStagingImage(id: string): Promise<string> {
  // A staging object MUST exist. This is the security boundary: callers can only
  // attach an id they just uploaded to staging (a random UUID, private, short
  // lived). An arbitrary or already-committed key lifted from another recipe's
  // public imageUrl has no staging object and is rejected here — so it can
  // never be attached, and thus never later trigger a delete of someone else's
  // renditions. (Renditions from a partially-failed prior attempt are simply
  // overwritten, since staging is only deleted on full success below.)
  const staging = stagingObjectKey(id);
  const meta = await headObject(staging);

  if (!meta) {
    throw new Error('Image upload not found or expired');
  }

  if (meta.size > MAX_UPLOAD_BYTES) {
    await deleteObject(staging).catch(() => {});
    throw new Error('Image file too large');
  }

  const original = await getObjectBuffer(staging);
  const key = permanentImageKey(id);

  // metadata() only parses the header and passes HEIC/HEVC (whose decoder is
  // absent from the musl prebuilt binary); stats() forces a real pixel decode.
  try {
    await sharp(original, { limitInputPixels: MAX_INPUT_PIXELS }).stats();
  } catch {
    await deleteObject(staging).catch(() => {});
    // Clean any partial renditions too.
    await deleteImagePrefix(key).catch(() => {});
    throw new Error('Unsupported or corrupt image file');
  }

  await putObject(originalObjectKey(key), original, meta.contentType);
  await generateAndUploadRenditions(key, original);
  await deleteObject(staging).catch(() => {});

  return key;
}
