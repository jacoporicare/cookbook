import { useTheme } from '@react-navigation/native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useRecipe } from '@/features/recipe/hooks/use-recipe';
import { RecipeDetailScreen } from '@/features/recipe/screens/recipe-detail-screen';

const IMAGE_HEIGHT = 400;
const TITLE_FADE_START = IMAGE_HEIGHT - 160;
const TITLE_FADE_END = IMAGE_HEIGHT - 80;

function AnimatedHeaderTitle({
  title,
  scrollY,
}: {
  title: string;
  scrollY: SharedValue<number>;
}) {
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [TITLE_FADE_START, TITLE_FADE_END],
      [0, 1],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return { opacity };
  });

  return (
    <Animated.Text
      style={[
        { fontSize: 17, fontWeight: '600', color: colors.text },
        animatedStyle,
      ]}
      numberOfLines={1}
    >
      {title}
    </Animated.Text>
  );
}

export default function RecipeDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { recipe, loading, error } = useRecipe(slug);

  const [scrollY, setScrollY] = useState<SharedValue<number> | null>(null);

  const onScrollYReady = useCallback((sv: SharedValue<number>) => {
    setScrollY(sv);
  }, []);

  const title = recipe?.title ?? 'Recept';

  const headerTitle = useMemo(() => {
    if (!scrollY) return undefined;
    const HeaderTitle = () => (
      <AnimatedHeaderTitle title={title} scrollY={scrollY} />
    );
    HeaderTitle.displayName = 'HeaderTitle';
    return HeaderTitle;
  }, [scrollY, title]);

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerTransparent: true,
          headerTitle: scrollY ? headerTitle : undefined,
        }}
      />
      <RecipeDetailScreen
        recipe={recipe}
        loading={loading}
        error={error}
        onScrollYReady={onScrollYReady}
      />
    </>
  );
}
