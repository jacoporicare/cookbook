import { View } from 'react-native';

import { Image } from '@/components/styled';
import { resolveImageUrl } from '@/lib/apollo-client';

import { RecipeImagePlaceholder } from './recipe-image-placeholder';

type Props = {
  imageUrl: string | null;
};

export function RecipeDetailHeaderImage({ imageUrl }: Props) {
  const resolved = resolveImageUrl(imageUrl);

  if (!resolved) {
    return <RecipeImagePlaceholder size={64} className="w-full flex-1" />;
  }

  return (
    <View className="w-full flex-1">
      <Image
        source={{ uri: resolved }}
        contentFit="cover"
        className="absolute inset-0"
      />
    </View>
  );
}
