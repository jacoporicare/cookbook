import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from '../../AuthContext';
import { useMeQuery, useRecipeListQuery } from '../../generated/graphql';

import Header from './Header';

function HeaderContainer() {
  const router = useRouter();
  const [token] = useAuth();
  const { data: meData, loading: meLoading } = useMeQuery({ skip: !token });
  const { data: recipesData } = useRecipeListQuery();

  function handleRecipeSelected(slug: string) {
    router.push(`/recept/${slug}`);
  }

  const recipes = recipesData?.recipes ?? [];

  return (
    <Header
      isUserAdmin={!!meData?.me?.isAdmin}
      isUserLoading={meLoading}
      recipes={recipes}
      userName={meData?.me?.displayName}
      onRecipeSelected={handleRecipeSelected}
    />
  );
}

export default HeaderContainer;
