export type ImageUploadResult = {
  imageId: string;
};

export type ImageUploadError = {
  error: string;
};

/**
 * Upload an image via the Next.js API route.
 * The API route proxies to the backend and handles auth from cookies.
 */
export async function uploadImage(file: File): Promise<ImageUploadResult> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error: ImageUploadError = await response.json();
    throw new Error(error.error || 'Failed to upload image');
  }

  const result: ImageUploadResult = await response.json();
  return result;
}
