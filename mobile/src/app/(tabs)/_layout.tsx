import { Stack } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <NativeTabs backBehavior="history">
        <NativeTabs.Trigger name="(recipes)">
          <Label>Recepty</Label>
          <Icon sf="menucard.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="(sous-vide)">
          <Label>Sous-vide</Label>
          <Icon sf="thermometer" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="(search)" role="search" />
      </NativeTabs>
    </>
  );
}
