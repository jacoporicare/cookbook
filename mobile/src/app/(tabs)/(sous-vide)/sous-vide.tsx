import { useQuery } from '@apollo/client/react';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';

import { DisplayModeToggle } from '@/features/recipe/components/display-mode-toggle';
import { useDisplayMode } from '@/features/recipe/hooks/use-display-mode';
import { RecipeListScreen } from '@/features/recipe/screens/recipe-list-screen';
import { RecipeListDocument } from '@/generated/graphql';

export default function RecipeList() {
  const { data, loading, error, refetch } = useQuery(RecipeListDocument);
  const [displayMode, toggleDisplayMode] = useDisplayMode();

  const recipes =
    data?.recipes?.filter((recipe) => recipe.tags.includes('sous-vide')) ?? [];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sous-vide recepty',
          headerLargeTitleEnabled: isLiquidGlassAvailable() ? true : false,
          headerTransparent: isLiquidGlassAvailable() ? true : false,
          headerRight: () => (
            <DisplayModeToggle
              mode={displayMode}
              onToggle={toggleDisplayMode}
            />
          ),
        }}
      />
      <RecipeListScreen
        recipes={recipes}
        loading={loading}
        error={error?.message}
        onRefresh={refetch}
        displayMode={displayMode}
      />
    </>
  );
}
