import { View } from 'react-native';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type Ingredient = {
  id: string;
  name: string;
  amount: number | null;
  amountUnit: string | null;
  isGroup: boolean;
};

type Props = {
  ingredients: Ingredient[];
};

export function RecipeDetailIngredients({ ingredients }: Props) {
  if (ingredients.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Ingredience</CardTitle>
      </CardHeader>
      <CardContent>
        {ingredients.map((ingredient, index) => {
          if (ingredient.isGroup) {
            return (
              <Text
                key={ingredient.id}
                className={cn('font-bold', index > 0 && 'mt-3')}
              >
                {ingredient.name}
              </Text>
            );
          }

          const amountParts = [
            ingredient.amount != null ? String(ingredient.amount) : null,
            ingredient.amountUnit,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <View key={ingredient.id}>
              {index > 0 && !ingredients[index - 1]?.isGroup && (
                <Separator className="my-2" />
              )}
              <Text className="text-base">{ingredient.name}</Text>
              {amountParts.length > 0 && (
                <Text className="text-sm text-muted-foreground">
                  {amountParts}
                </Text>
              )}
            </View>
          );
        })}
      </CardContent>
    </Card>
  );
}
