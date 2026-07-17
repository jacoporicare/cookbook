import 'dotenv/config';

import { writeFileSync } from 'node:fs';

import { zip } from 'fflate';

import { bucket, getObjectBuffer, listKeysUnderPrefix } from '../s3';

/**
 * Standalone backup: download every permanent recipe-image object from the S3
 * bucket and write them into a single .zip at the given path. Meant to be run
 * inside the API container (where the S3 credentials live) via `docker exec`,
 * then copied out — mirroring the accounting attachments backup flow.
 *
 *   node scripts/backupImages.js /tmp/2026-07-17-images.zip
 *
 * Only the permanent `images/` prefix is backed up; the transient `staging/`
 * prefix (lifecycle-expired uploads) is skipped. The zip entry keys mirror the
 * bucket's folder structure (images/<id>/original, images/<id>/<width>.webp,
 * images/<id>/1080x1080.jpg), so a restore is a plain re-upload. Each run is a
 * full snapshot. Reads S3_BUCKET / AWS_REGION / AWS_* from the environment (same
 * as the API, via ../s3).
 */
async function backup() {
  const outPath = process.argv[2];

  if (!outPath) {
    console.error('Usage: backupImages.js OUTPUT_ZIP_PATH');
    process.exit(1);
  }

  // Permanent images only; staging/ is transient and lifecycle-expired.
  const keys = await listKeysUnderPrefix('images/');
  console.log(`Found ${keys.length} object(s) under images/ in ${bucket}`);

  // Download each object into the archive map, keyed by its full object key so
  // the zip mirrors the bucket's folder structure. Object data is held in
  // memory — fine at this scale; revisit with a streaming zip if the bucket
  // grows very large.
  const archive: Record<string, Uint8Array> = {};
  for (const key of keys) {
    archive[key] = await getObjectBuffer(key);
  }

  // WebP/JPEG renditions (and most originals) are already compressed, so use a
  // light level — cheap CPU, marginal size.
  const zipped = await new Promise<Uint8Array>((resolve, reject) => {
    zip(archive, { level: 1 }, (err, data) =>
      err ? reject(err) : resolve(data),
    );
  });

  writeFileSync(outPath, zipped);
  console.log(
    `Wrote ${keys.length} object(s) → ${outPath} (${zipped.length} bytes)`,
  );
}

backup().catch((err) => {
  console.error('Backup failed:', err);
  process.exit(1);
});
