'use client';

import { useAuthUser } from '@/lib/use-auth-user';

import { Nav } from './Nav';

/**
 * Renders the navigation with the current user resolved on the client from the
 * JWT cookie. This keeps the surrounding shell fully static (no `cookies()` on
 * the server, so no dynamic hole) while showing the correct signed-in state
 * without a flash — see `useAuthUser`.
 */
export function NavClient() {
  const user = useAuthUser();

  return <Nav user={user} />;
}
