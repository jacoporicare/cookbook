import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, toUser } from '@/lib/auth-server';

import { Nav } from './Nav';

/**
 * Dynamic (per-request) part of the navigation. Reads the auth cookie to
 * resolve the current user, so it must be rendered inside a `<Suspense>`
 * boundary — this lets the surrounding shell prerender while the user-specific
 * nav streams in. The Suspense fallback renders `<Nav user={null} />`.
 */
export async function NavUser() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  return <Nav user={toUser(currentUser)} />;
}
