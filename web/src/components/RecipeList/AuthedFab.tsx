'use client';

import { useAuthUser } from '@/lib/use-auth-user';

import { RecipeListFab } from './RecipeListFab';

/**
 * Renders the "new recipe" FAB only for logged-in users. The signed-in state is
 * resolved on the client from the JWT cookie (see `useAuthUser`), so the recipe
 * list stays fully static — no dynamic hole, no server round-trip for the FAB.
 */
export function AuthedFab() {
  const user = useAuthUser();

  if (!user) {
    return null;
  }

  return <RecipeListFab />;
}
