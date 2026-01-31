import { Link } from 'expo-router';
import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Image } from '@/components/styled';
import { Text } from '@/components/ui/text';
import { RecipeBaseFragment } from '@/generated/graphql';
import { resolveImageUrl } from '@/lib/apollo-client';
import { formatTime } from '@/lib/format-time';

import { RecipeImagePlaceholder } from './recipe-image-placeholder';

type Props = {
  recipe: RecipeBaseFragment;
};

export const RecipeListItem = memo(
  function RecipeListItem({ recipe }: Props) {
    return (
      <Link
        href={{ pathname: '/[slug]', params: { slug: recipe.slug } }}
        asChild
      >
        <Pressable className="flex-row items-center bg-card px-4 py-3">
          <View className="h-[60px] w-[80px] overflow-hidden rounded-lg">
            {recipe.listImageUrl ? (
              <Image
                source={{ uri: resolveImageUrl(recipe.listImageUrl)! }}
                contentFit="cover"
                className="absolute inset-0"
              />
            ) : (
              <RecipeImagePlaceholder size={24} className="absolute inset-0" />
            )}
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold" numberOfLines={2}>
              {recipe.title}
            </Text>
            {recipe.preparationTime != null && (
              <Text className="mt-0.5 text-sm text-muted-foreground">
                {formatTime(recipe.preparationTime)}
              </Text>
            )}
          </View>
        </Pressable>
      </Link>
    );
  },
  (prev, next) => prev.recipe.id === next.recipe.id,
);
