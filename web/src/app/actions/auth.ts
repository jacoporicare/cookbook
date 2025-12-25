'use server';

import type { SubmissionResult } from '@conform-to/dom';
import { parseWithZod } from '@conform-to/zod/v4';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { AUTH_TOKEN_KEY } from '@/const';
import { ChangePasswordDocument, LoginDocument } from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';

// Schemas
const loginSchema = z.object({
  username: z.string().min(1, { error: 'Uživatelské jméno je povinné' }),
  password: z.string().min(1, { error: 'Heslo je povinné' }),
});

const changePasswordSchema = z
  .object({
    password: z.string().min(1, { error: 'Aktuální heslo je povinné' }),
    newPassword: z
      .string()
      .min(6, { error: 'Nové heslo musí mít alespoň 6 znaků' }),
    newPasswordConfirm: z
      .string()
      .min(1, { error: 'Potvrzení hesla je povinné' }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Hesla se neshodují',
    path: ['newPasswordConfirm'],
  });

// Types
export type LoginState = SubmissionResult<string[]> & {
  redirectUrl?: string;
};

export type ChangePasswordState = SubmissionResult<string[]>;

// Actions
export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const redirectUri = formData.get('redirect_uri') as string | null;
  const returnUrl = formData.get('return_url') as string | null;

  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: LoginDocument,
      variables: submission.value,
    });

    if (!data?.login?.token) {
      return submission.reply({
        formErrors: ['Neplatné uživatelské jméno nebo heslo'],
      });
    }

    const token = data.login.token;

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_KEY, token, {
      httpOnly: false, // Needs to be accessible client-side for ApolloWrapper compatibility during transition
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      sameSite: 'lax',
    });

    // Handle WebView redirect (mobile app)
    if (redirectUri) {
      const redirectUrl = new URL(redirectUri);
      redirectUrl.searchParams.set('access_token', token);
      return { status: 'success', redirectUrl: redirectUrl.toString() };
    }

    // Normal redirect
    redirect(returnUrl || '/');
  } catch (e) {
    // Check if it's a redirect (which is thrown as an error)
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      throw e;
    }
    return submission.reply({
      formErrors: ['Neplatné uživatelské jméno nebo heslo'],
    });
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
  redirect('/');
}

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const submission = parseWithZod(formData, { schema: changePasswordSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: ChangePasswordDocument,
      variables: {
        password: submission.value.password,
        newPassword: submission.value.newPassword,
      },
    });

    if (data?.changePassword) {
      return { status: 'success' };
    }

    return submission.reply({
      formErrors: ['Nepodařilo se změnit heslo'],
    });
  } catch {
    return submission.reply({
      formErrors: ['Neplatné aktuální heslo'],
    });
  }
}
