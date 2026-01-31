import { Ionicons } from '@expo/vector-icons';
import { SymbolView } from 'expo-symbols';
import { Platform, PlatformColor, Pressable, View } from 'react-native';

import { type DisplayMode } from '../hooks/use-display-mode';

type Props = {
  mode: DisplayMode;
  onToggle: () => void;
};

export function DisplayModeToggle({ mode, onToggle }: Props) {
  const isGrid = mode === 'grid';

  return (
    <Pressable onPress={onToggle}>
      {Platform.OS === 'ios' ? (
        <View className="size-9 items-center justify-center">
          <SymbolView
            name={isGrid ? 'list.bullet' : 'square.grid.2x2'}
            tintColor={PlatformColor('label')}
            size={24}
          />
        </View>
      ) : (
        <Ionicons name={isGrid ? 'list-outline' : 'grid-outline'} size={24} />
      )}
    </Pressable>
  );
}
