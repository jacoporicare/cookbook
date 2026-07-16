import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Recipe images live in an S3 bucket whose bucket policy grants public GET only
// to *.webp / *.jpg. Renditions (served directly to the browser — the API is
// not in the read path) are public; the pristine original and transient staging
// uploads have no such extension and are therefore private.
//
// Upload uses the staging pattern: the browser PUTs the original to
// `staging/<key>` (private, presigned) and createRecipe/updateRecipe promote it
// — generating renditions under `<key>/` and storing `<key>/original`. Abandoned
// staging uploads are swept by an S3 lifecycle rule (expire `staging/` after 1
// day), so no application-side orphan pruning is needed.

const region = process.env.AWS_REGION || 'eu-central-1';
export const bucket = process.env.S3_BUCKET || 'zradelnik-recipe-images';

// Public base for GET URLs. Defaults to the virtual-hosted S3 endpoint; override
// with S3_PUBLIC_BASE_URL to point at a CDN later without touching stored keys.
export const publicBaseUrl =
  process.env.S3_PUBLIC_BASE_URL ||
  `https://${bucket}.s3.${region}.amazonaws.com`;

// Renditions are content-addressed (a new image key is minted whenever a
// recipe's picture changes), so they can be cached forever.
export const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';

const s3 = new S3Client({ region });

// Permanent images live under an `images/` prefix so the bucket root stays
// clean (only `images/` and `staging/`). This is the value stored in
// `recipe.image` and used as the public URL path; renditions live beneath it.
export function permanentImageKey(id: string) {
  return `images/${id}`;
}

// Transient upload location (private, lifecycle-expired). The browser PUTs the
// original here; promotion reads it and then deletes it.
export function stagingObjectKey(id: string) {
  return `staging/${id}`;
}

// The pristine original, kept for future re-encoding. Private (no public ext).
export function originalObjectKey(key: string) {
  return `${key}/original`;
}

export function objectUrl(objectKey: string) {
  return `${publicBaseUrl}/${objectKey}`;
}

// Presign a PUT for the original upload into staging. The browser must send the
// same Content-Type it was signed with, or S3 rejects the signature.
export function presignStagingUpload(key: string, contentType: string) {
  return getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: bucket,
      Key: stagingObjectKey(key),
      ContentType: contentType,
    }),
    { expiresIn: 300 },
  );
}

export async function headObject(
  objectKey: string,
): Promise<{ size: number; contentType: string } | null> {
  try {
    const res = await s3.send(
      new HeadObjectCommand({ Bucket: bucket, Key: objectKey }),
    );
    return {
      size: res.ContentLength ?? 0,
      contentType: res.ContentType ?? 'application/octet-stream',
    };
  } catch (e) {
    if (
      e instanceof Error &&
      (e.name === 'NotFound' || e.name === 'NoSuchKey')
    ) {
      return null;
    }
    throw e;
  }
}

export async function objectExists(objectKey: string): Promise<boolean> {
  return (await headObject(objectKey)) !== null;
}

export async function getObjectBuffer(objectKey: string): Promise<Buffer> {
  const res = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: objectKey }),
  );
  const bytes = await res.Body!.transformToByteArray();
  return Buffer.from(bytes);
}

export async function putObject(
  objectKey: string,
  body: Buffer,
  contentType: string,
) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: body,
      ContentType: contentType,
      CacheControl: IMMUTABLE_CACHE_CONTROL,
    }),
  );
}

export async function deleteObject(objectKey: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: objectKey }));
}

// Server-side copy within the bucket (preserves content-type + cache-control).
export async function copyObject(fromKey: string, toKey: string) {
  await s3.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${encodeURIComponent(fromKey)}`,
      Key: toKey,
      MetadataDirective: 'COPY',
    }),
  );
}

export async function listKeysUnderPrefix(prefix: string): Promise<string[]> {
  const keys: string[] = [];
  let token: string | undefined;

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: token,
      }),
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key) {
        keys.push(obj.Key);
      }
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);

  return keys;
}

// Delete every object under `<key>/` — used when a recipe's picture is replaced
// or removed. No-op if the prefix is already empty.
export async function deleteImagePrefix(key: string) {
  const objects = await listKeysUnderPrefix(`${key}/`);

  if (objects.length === 0) {
    return;
  }

  // DeleteObjects handles up to 1000 keys per call; an image has ~8 objects.
  for (let i = 0; i < objects.length; i += 1000) {
    const chunk = objects.slice(i, i + 1000);
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: { Objects: chunk.map((Key) => ({ Key })) },
      }),
    );
  }
}
