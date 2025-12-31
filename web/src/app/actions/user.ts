'use server';

import type { SubmissionResult } from '@conform-to/dom';
import { parseWithZod } from '@conform-to/zod/v4';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import {
  CreateUserDocument,
  DeleteUserDocument,
  ResetPasswordDocument,
  UpdateUserDocument,
  UpdateUserLastActivityDocument,
} from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

// Schemas
const userSchema = z.object({
  username: z.string().min(1, { error: 'Uživatelské jméno je povinné' }),
  displayName: z.string().min(1, { error: 'Zobrazované jméno je povinné' }),
  isAdmin: z.stringbool().optional().default(false),
});

// Types
export type UserFormState = SubmissionResult<string[]> & {
  newPassword?: string;
};

export type DeleteUserState = {
  success?: boolean;
  error?: string;
};

// Helper to ensure admin access
async function requireAdmin() {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user?.isAdmin) {
    throw new Error('Přístup odepřen');
  }
  return user;
}

// Actions
export async function createUserAction(
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    await requireAdmin();
  } catch {
    return { status: 'error', error: { '': ['Přístup odepřen'] } };
  }

  const submission = parseWithZod(formData, { schema: userSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: CreateUserDocument,
      variables: {
        user: {
          username: submission.value.username,
          displayName: submission.value.displayName,
          isAdmin: submission.value.isAdmin ?? null,
        },
      },
    });

    revalidatePath('/admin');
    return { status: 'success' };
  } catch {
    return submission.reply({
      formErrors: ['Nepodařilo se vytvořit uživatele'],
    });
  }
}

export async function updateUserAction(
  userId: string,
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    await requireAdmin();
  } catch {
    return { status: 'error', error: { '': ['Přístup odepřen'] } };
  }

  const submission = parseWithZod(formData, { schema: userSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: UpdateUserDocument,
      variables: {
        id: userId,
        user: {
          username: submission.value.username,
          displayName: submission.value.displayName,
          isAdmin: submission.value.isAdmin ?? null,
        },
      },
    });

    revalidatePath('/admin');
    return { status: 'success' };
  } catch {
    return submission.reply({
      formErrors: ['Nepodařilo se aktualizovat uživatele'],
    });
  }
}

export async function deleteUserAction(
  userId: string,
): Promise<DeleteUserState> {
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

export async function resetPasswordAction(
  userId: string,
): Promise<UserFormState> {
  try {
    await requireAdmin();
  } catch {
    return { status: 'error', error: { '': ['Přístup odepřen'] } };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: ResetPasswordDocument,
      variables: { id: userId },
    });

    if (!data?.resetPassword) {
      return {
        status: 'error',
        error: { '': ['Nepodařilo se resetovat heslo'] },
      };
    }

    return {
      status: 'success',
      newPassword: data.resetPassword,
    };
  } catch {
    return {
      status: 'error',
      error: { '': ['Nepodařilo se resetovat heslo'] },
    };
  }
}

export async function trackUserActivityAction(): Promise<void> {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user) {
    return;
  }

  try {
    await client.mutate({
      mutation: UpdateUserLastActivityDocument,
    });
  } catch {
    // Silently fail - activity tracking is not critical
  }
}
