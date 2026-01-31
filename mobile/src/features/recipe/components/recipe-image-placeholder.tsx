import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

type Props = {
  size?: number;
  className?: string;
};

export function RecipeImagePlaceholder({ size = 40, className }: Props) {
  // iOS systemGray — matches --color-muted-foreground
  const iconColor = '#8E8E93';

  return (
    <View className={cn('items-center justify-center bg-muted', className)}>
      <Ionicons name="restaurant-outline" size={size} color={iconColor} />
    </View>
  );
}
