import { View } from 'react-native';

import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatTime } from '@/lib/format-time';

type Props = {
  preparationTime: number | null;
  servingCount: number | null;
  sideDish: string | null;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="font-medium">{value}</Text>
    </View>
  );
}

export function RecipeDetailBasicInfo({
  preparationTime,
  servingCount,
  sideDish,
}: Props) {
  const hasInfo =
    preparationTime != null || servingCount != null || sideDish != null;
  if (!hasInfo) return null;

  return (
    <Card>
      <CardContent className="gap-3">
        {preparationTime != null && (
          <InfoRow label="Doba přípravy" value={formatTime(preparationTime)} />
        )}
        {servingCount != null && (
          <InfoRow label="Počet porcí" value={String(servingCount)} />
        )}
        {sideDish != null && <InfoRow label="Příloha" value={sideDish} />}
      </CardContent>
    </Card>
  );
}
