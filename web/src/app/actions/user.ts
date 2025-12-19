'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import {
  CreateUserDocument,
  UpdateUserDocument,
  DeleteUserDocument,
  ResetPasswordDocument,
  UpdateUserLastActivityDocument,
} from '@/generated/graphql';

// Schemas
const userSchema = z.object({
  username: z.string().min(1, 'Uživatelské jméno je povinné'),
  displayName: z.string().min(1, 'Zobrazované jméno je povinné'),
  isAdmin: z.boolean().optional(),
});

// Types
export type UserFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    username?: string[];
    displayName?: string[];
  };
  newPassword?: string; // For password reset
};

export type DeleteUserState = {
  success?: boolean;
  error?: string;
};

// Helper to ensure admin access
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    throw new Error('Přístup odepřen');
  }
  return user;
}

// Actions
export async function createUserAction(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    await requireAdmin();
  } catch {
    return { error: 'Přístup odepřen' };
  }

  const rawData = {
    username: formData.get('username') as string,
    displayName: formData.get('displayName') as string,
    isAdmin: formData.get('isAdmin') === 'true',
  };

  const validated = userSchema.safeParse(rawData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: CreateUserDocument,
      variables: { user: validated.data },
    });

    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Nepodařilo se vytvořit uživatele' };
  }
}

export async function updateUserAction(
  userId: string,
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    await requireAdmin();
  } catch {
    return { error: 'Přístup odepřen' };
  }

  const rawData = {
    username: formData.get('username') as string,
    displayName: formData.get('displayName') as string,
    isAdmin: formData.get('isAdmin') === 'true',
  };

  const validated = userSchema.safeParse(rawData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: UpdateUserDocument,
      variables: {
        id: userId,
        user: validated.data,
      },
    });

    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Nepodařilo se aktualizovat uživatele' };
  }
}

export async function deleteUserAction(userId: string): Promise<DeleteUserState> {
  try {
    await requireAdmin();
  } catch {
    return { error: 'Přístup odepřen' };
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: DeleteUserDocument,
      variables: { id: userId },
    });

    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Nepodařilo se smazat uživatele' };
  }
}

export async function resetPasswordAction(userId: string): Promise<UserFormState> {
  try {
    await requireAdmin();
  } catch {
    return { error: 'Přístup odepřen' };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: ResetPasswordDocument,
      variables: { id: userId },
    });

    if (!data?.resetPassword) {
      return { error: 'Nepodařilo se resetovat heslo' };
    }

    return {
      success: true,
      newPassword: data.resetPassword,
    };
  } catch {
    return { error: 'Nepodařilo se resetovat heslo' };
  }
}

export async function trackUserActivityAction(): Promise<void> {
  const user = await getCurrentUser();
  if (!user) {
    return;
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: UpdateUserLastActivityDocument,
    });
  } catch {
    // Silently fail - activity tracking is not critical
  }
}
