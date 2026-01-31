import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { Separator } from '@/components/ui/separator';
import { RecipeBaseFragment } from '@/generated/graphql';

import { RecipeGridItem } from '../components/recipe-grid-item';
import { RecipeListItem } from '../components/recipe-list-item';
import { type DisplayMode } from '../hooks/use-display-mode';

type Props = {
  recipes: RecipeBaseFragment[];
  loading: boolean;
  error?: string;
  onRefresh: () => void;
  displayMode: DisplayMode;
};

const keyExtractor = (item: RecipeBaseFragment) => item.id;

const ListEmptyComponent = (
  <View className="items-center py-8">
    <Text className="text-muted-foreground">Žádné recepty</Text>
  </View>
);

const ItemSeparator = () => <Separator className="ml-27" />;

const renderGridItem = ({ item }: { item: RecipeBaseFragment }) => (
  <RecipeGridItem recipe={item} />
);

const renderListItem = ({ item }: { item: RecipeBaseFragment }) => (
  <RecipeListItem recipe={item} />
);

export function RecipeListScreen({
  recipes,
  loading,
  error,
  onRefresh,
  displayMode,
}: Props) {
  if (loading && recipes.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-destructive">{error}</Text>
      </View>
    );
  }

  if (displayMode === 'grid') {
    return (
      <FlatList
        key="grid"
        data={recipes}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperClassName="gap-3 px-4"
        contentContainerClassName="gap-3 pb-4 pt-4"
        contentInsetAdjustmentBehavior="automatic"
        refreshing={loading}
        onRefresh={onRefresh}
        renderItem={renderGridItem}
        ListEmptyComponent={ListEmptyComponent}
        automaticallyAdjustKeyboardInsets
      />
    );
  }

  return (
    <FlatList
      key="list"
      data={recipes}
      keyExtractor={keyExtractor}
      contentContainerClassName="pb-4 pt-2"
      contentInsetAdjustmentBehavior="automatic"
      refreshing={loading}
      onRefresh={onRefresh}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderListItem}
      ListEmptyComponent={ListEmptyComponent}
      automaticallyAdjustKeyboardInsets
    />
  );
}
