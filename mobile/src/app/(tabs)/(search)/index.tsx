import { useQuery } from '@apollo/client/react';
import { useFocusEffect } from '@react-navigation/native';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import type { SearchBarCommands } from 'react-native-screens';

import { DisplayModeToggle } from '@/features/recipe/components/display-mode-toggle';
import { useDisplayMode } from '@/features/recipe/hooks/use-display-mode';
import { useRecipeSearch } from '@/features/recipe/hooks/use-recipe-search';
import { RecipeListScreen } from '@/features/recipe/screens/recipe-list-screen';
import { RecipeListDocument } from '@/generated/graphql';

export default function RecipeList() {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(RecipeListDocument);
  const [displayMode, toggleDisplayMode] = useDisplayMode();
  const [searchText, setSearchText] = useState('');
  const searchBarRef = useRef<SearchBarCommands>(null);

  useFocusEffect(
    useCallback(() => {
      searchBarRef.current?.focus();
    }, []),
  );

  const recipes = data?.recipes ?? [];
  const filteredRecipes = useRecipeSearch(recipes, searchText);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Hledat recept',
          headerLargeTitleEnabled: isLiquidGlassAvailable() ? true : false,
          headerTransparent: isLiquidGlassAvailable() ? true : false,
          headerSearchBarOptions: {
            ref: searchBarRef as React.RefObject<SearchBarCommands>,
            placeholder: 'Zadejte hledaný výraz',
            onChangeText: (e) => setSearchText(e.nativeEvent.text),
            onCancelButtonPress: () => router.back(),
            autoCapitalize: 'none',
          },
          headerRight: () => (
            <DisplayModeToggle
              mode={displayMode}
              onToggle={toggleDisplayMode}
            />
          ),
        }}
      />
      <RecipeListScreen
        recipes={filteredRecipes}
        loading={loading}
        error={error?.message}
        onRefresh={refetch}
        displayMode={displayMode}
      />
    </>
  );
}
