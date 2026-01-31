import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { RecipeBySlugQuery } from '@/generated/graphql';

import { RecipeDetailBasicInfo } from '../components/recipe-detail-basic-info';
import { RecipeDetailDirections } from '../components/recipe-detail-directions';
import { RecipeDetailHeaderImage } from '../components/recipe-detail-header-image';
import { RecipeDetailIngredients } from '../components/recipe-detail-ingredients';

type Recipe = NonNullable<RecipeBySlugQuery['recipe']>;

const IMAGE_HEIGHT = 400;
const TITLE_FADE_START = IMAGE_HEIGHT - 160;
const TITLE_FADE_END = IMAGE_HEIGHT - 80;

type Props = {
  recipe: Recipe | null;
  loading: boolean;
  error?: string;
  onScrollYReady?: (scrollY: SharedValue<number>) => void;
};

export function RecipeDetailScreen({
  recipe,
  loading,
  error,
  onScrollYReady,
}: Props) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Expose scrollY to parent for header title animation
  useEffect(() => {
    onScrollYReady?.(scrollY);
  }, [onScrollYReady, scrollY]);

  // Image overscroll zoom
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-200, 0], [2, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      transform: [{ scale }],
    };
  });

  // Blur overlay fades in as user scrolls
  const blurAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT * 0.3],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return { opacity };
  });

  // Inline title fades out as it scrolls under the header
  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [TITLE_FADE_START, TITLE_FADE_END],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return { opacity };
  });

  if (loading && !recipe) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && !recipe) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-destructive">{error}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-muted-foreground">Recept nenalezen</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Fixed background image with parallax */}
      <Animated.View
        className="absolute inset-x-0 top-0 h-[400px] overflow-hidden"
        style={imageAnimatedStyle}
      >
        <RecipeDetailHeaderImage imageUrl={recipe.imageThumbUrl} />
        <Animated.View className="absolute inset-0" style={blurAnimatedStyle}>
          <BlurView intensity={50} className="absolute inset-0" />
        </Animated.View>
      </Animated.View>

      {/* Scrollable content over the image */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerClassName="pb-safe"
      >
        {/* Same height as image */}
        <View className="h-[400px] justify-end">
          {/* Inline recipe title */}
          <Animated.View className="px-4 pb-2.5" style={titleAnimatedStyle}>
            <Text
              variant="h1"
              className="text-left text-white"
              style={styles.titleShadow}
            >
              {recipe.title}
            </Text>
          </Animated.View>
        </View>

        {/* Glass cards */}
        <View className="gap-4 px-4 pt-4">
          <RecipeDetailBasicInfo
            preparationTime={recipe.preparationTime}
            servingCount={recipe.servingCount}
            sideDish={recipe.sideDish}
          />

          <RecipeDetailIngredients ingredients={recipe.ingredients} />

          {recipe.directions && (
            <RecipeDetailDirections directions={recipe.directions} />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
