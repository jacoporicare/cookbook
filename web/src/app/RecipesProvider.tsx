'use client';

import { ReactNode, createContext, useContext } from 'react';

import { RecipeBaseFragment } from '@/generated/graphql';

const RecipesContext = createContext<RecipeBaseFragment[]>([]);

type Props = {
  recipes: RecipeBaseFragment[];
  children: ReactNode;
};

export function RecipesProvider({ recipes, children }: Props) {
  return (
    <RecipesContext.Provider value={recipes}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}
