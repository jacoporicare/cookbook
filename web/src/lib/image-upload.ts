import { createImageUploadAction } from '@/app/actions/image';

export type ImageUploadResult = {
  imageId: string;
};

// Keep in sync with MAX_UPLOAD_BYTES in api/src/imageProcessing.ts. The API
// re-checks server-side; this is just fast client feedback.
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export class ImageTooLargeError extends Error {}

/**
 * Upload a recipe image via a presigned direct-to-S3 PUT into staging:
 *   1. ask the API (via a Server Action) to presign a staging upload,
 *   2. PUT the original straight to S3 (never touches our servers).
 * The returned key is submitted as `imageId` with the recipe; createRecipe/
 * updateRecipe then promote the staged upload (generate renditions). Abandoned
 * staging uploads are auto-expired by an S3 lifecycle rule.
 */
export async function uploadImage(file: File): Promise<ImageUploadResult> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new ImageTooLargeError('Obrázek je příliš velký (max 15 MB)');
  }

  const { key, uploadUrl } = await createImageUploadAction(file.type);

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    // Must match the Content-Type the URL was signed with, or S3 rejects it.
    headers: { 'Content-Type': file.type },
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to storage');
  }

  return { imageId: key };
}
