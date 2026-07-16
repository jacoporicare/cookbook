'use server';

import { CreateImageUploadDocument } from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

export type CreateImageUploadResult = {
  key: string;
  uploadUrl: string;
};

/**
 * Ask the API to presign a direct-to-S3 upload for a recipe image original.
 * Auth is taken from the cookie server-side (the browser can't read it).
 */
export async function createImageUploadAction(
  contentType: string,
): Promise<CreateImageUploadResult> {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user) {
    throw new Error('Nejste přihlášen');
  }

  const { data } = await client.mutate({
    mutation: CreateImageUploadDocument,
    variables: { contentType },
  });

  if (!data?.createImageUpload) {
    throw new Error('Nepodařilo se připravit nahrání obrázku');
  }

  const { key, uploadUrl } = data.createImageUpload;
  return { key, uploadUrl };
}
