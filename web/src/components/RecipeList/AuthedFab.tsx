import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

import { RecipeListFab } from './RecipeListFab';

/**
 * Renders the "new recipe" FAB only for logged-in users. Reads the auth cookie,
 * so it must be rendered inside a `<Suspense>` boundary (fallback: nothing).
 */
export async function AuthedFab() {
  const client = await getClient();
  const user = await getCurrentUser(client);

  if (!user) {
    return null;
  }

  return <RecipeListFab />;
}
