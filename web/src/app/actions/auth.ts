'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { getClient } from '@/lib/apollo-client';
import { AUTH_TOKEN_KEY } from '@/const';
import { LoginDocument, ChangePasswordDocument } from '@/generated/graphql';

// Schemas
const loginSchema = z.object({
  username: z.string().min(1, 'Uživatelské jméno je povinné'),
  password: z.string().min(1, 'Heslo je povinné'),
});

const changePasswordSchema = z.object({
  password: z.string().min(1, 'Aktuální heslo je povinné'),
  newPassword: z.string().min(6, 'Nové heslo musí mít alespoň 6 znaků'),
  newPasswordConfirm: z.string().min(1, 'Potvrzení hesla je povinné'),
});

// Types
export type LoginState = {
  error?: string;
  fieldErrors?: { username?: string[]; password?: string[] };
  redirectUrl?: string;
};

export type ChangePasswordState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    password?: string[];
    newPassword?: string[];
    newPasswordConfirm?: string[];
  };
};

// Actions
export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const redirectUri = formData.get('redirect_uri') as string | null;
  const returnUrl = formData.get('return_url') as string | null;

  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: LoginDocument,
      variables: validated.data,
    });

    if (!data?.login?.token) {
      return { error: 'Neplatné uživatelské jméno nebo heslo' };
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
      return { redirectUrl: redirectUrl.toString() };
    }

    // Normal redirect
    redirect(returnUrl || '/');
  } catch (e) {
    // Check if it's a redirect (which is thrown as an error)
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      throw e;
    }
    return { error: 'Neplatné uživatelské jméno nebo heslo' };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
  redirect('/');
}

export async function changePasswordAction(
  prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const rawData = {
    password: formData.get('password') as string,
    newPassword: formData.get('newPassword') as string,
    newPasswordConfirm: formData.get('newPasswordConfirm') as string,
  };

  const validated = changePasswordSchema.safeParse(rawData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  if (rawData.newPassword !== rawData.newPasswordConfirm) {
    return {
      fieldErrors: {
        newPasswordConfirm: ['Hesla se neshodují'],
      },
    };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: ChangePasswordDocument,
      variables: {
        password: validated.data.password,
        newPassword: validated.data.newPassword,
      },
    });

    if (data?.changePassword) {
      return { success: true };
    }

    return { error: 'Nepodařilo se změnit heslo' };
  } catch {
    return { error: 'Neplatné aktuální heslo' };
  }
}
