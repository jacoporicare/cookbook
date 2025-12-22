const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export type ImageUploadResult = {
  imageId: string;
};

export type ImageUploadError = {
  error: string;
};

/**
 * Upload an image to the API and get back an imageId.
 * This should be called from client components before saving a recipe.
 */
export async function uploadImage(
  file: File,
  token: string,
): Promise<ImageUploadResult> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/api/upload/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error: ImageUploadError = await response.json();
    throw new Error(error.error || 'Failed to upload image');
  }

  const result: ImageUploadResult = await response.json();
  return result;
}
