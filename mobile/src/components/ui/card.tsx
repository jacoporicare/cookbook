import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { View, type ViewProps } from 'react-native';

import { GlassView } from '@/components/styled';
import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const glassEnabled = isLiquidGlassAvailable();

const CARD_BORDER_RADIUS = 28;

function Card({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      {glassEnabled ? (
        <GlassView
          glassEffectStyle="regular"
          // @ts-expect-error -- borderRadius is a native-only prop on ExpoGlassView for cornerConfiguration
          borderRadius={CARD_BORDER_RADIUS}
          className={cn('flex flex-col gap-6 rounded-card py-6', className)}
          {...props}
        />
      ) : (
        <View
          className={cn(
            'flex flex-col gap-6 rounded-card border border-border bg-card py-6 shadow-sm shadow-black/5',
            className,
          )}
          {...props}
        />
      )}
    </TextClassContext.Provider>
  );
}

function CardHeader({
  className,
  ...props
}: ViewProps & React.RefAttributes<View>) {
  return (
    <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('px-6', className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: ViewProps & React.RefAttributes<View>) {
  return (
    <View
      className={cn('flex flex-row items-center px-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
