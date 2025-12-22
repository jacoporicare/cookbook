'use client';

import { ReactNode } from 'react';

import { RecipeBaseFragment } from '@/generated/graphql';

import { RecipesProvider } from './RecipesProvider';
import { UserProvider } from './UserProvider';

type User = {
  name: string;
  isAdmin: boolean;
} | null;

type Props = {
  children: ReactNode;
  user: User;
  recipes: RecipeBaseFragment[];
};

export function Providers({ children, user, recipes }: Props) {
  return (
    <UserProvider user={user}>
      <RecipesProvider recipes={recipes}>{children}</RecipesProvider>
    </UserProvider>
  );
}
