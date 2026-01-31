import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

import { watchRecipeBySlugMap } from '@/features/recipe/hooks/use-recipe';
import { initApolloClient } from '@/lib/apollo-client';

import '../global.css';

Uniwind.setTheme('system');
SplashScreen.preventAutoHideAsync();

const LightIOSTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    border: '#C6C6C8',
    primary: '#007AFF',
  },
};

const DarkIOSTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#38383A',
    primary: '#0A84FF',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [client, setClient] = useState<ApolloClient | null>(null);

  useEffect(() => {
    initApolloClient().then((c) => {
      setClient(c);
      watchRecipeBySlugMap(c);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!client) return null;

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkIOSTheme : LightIOSTheme}
    >
      <ApolloProvider client={client}>
        <SafeAreaListener
          onChange={({ insets }) => {
            Uniwind.updateInsets(insets);
          }}
        >
          <Stack
            screenOptions={{
              headerBackButtonDisplayMode: isLiquidGlassAvailable()
                ? 'minimal'
                : undefined,
            }}
          />
          <PortalHost />
        </SafeAreaListener>
      </ApolloProvider>
    </ThemeProvider>
  );
}
