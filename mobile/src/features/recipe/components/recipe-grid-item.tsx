import { Link } from 'expo-router';
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Image } from '@/components/styled';
import { RecipeBaseFragment } from '@/generated/graphql';
import { resolveImageUrl } from '@/lib/apollo-client';

import { RecipeImagePlaceholder } from './recipe-image-placeholder';

type Props = {
  recipe: RecipeBaseFragment;
};

export const RecipeGridItem = memo(
  function RecipeGridItem({ recipe }: Props) {
    return (
      <Link
        href={{ pathname: '/[slug]', params: { slug: recipe.slug } }}
        asChild
      >
        <Pressable className="flex-1">
          <View className="aspect-square overflow-hidden rounded-card bg-muted">
            {recipe.imageThumbUrl ? (
              <Image
                source={{ uri: resolveImageUrl(recipe.imageThumbUrl)! }}
                contentFit="cover"
                className="absolute inset-0"
              />
            ) : (
              <RecipeImagePlaceholder size={48} className="flex-1" />
            )}
            <View className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 px-3 py-2">
              <Text
                className="text-base font-bold text-white"
                numberOfLines={2}
              >
                {recipe.title}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  },
  (prev, next) => prev.recipe.id === next.recipe.id,
);
