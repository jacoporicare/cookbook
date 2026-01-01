import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Ingredient } from '../../generated/graphql';
import { RichText } from '../RichText/RichText';
import { IngredientList } from './IngredientList';
import { RecipeImage } from './RecipeImage';

type Props = {
  title: string;
  ingredients?: Omit<Ingredient, '_id'>[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: string;
  imageUrl?: string;
  imageFullUrl?: string;
  isInstantPotRecipe?: boolean;
  userName?: string;
};

export function RecipeDetail({
  title,
  ingredients,
  servingCount,
  directions,
  lastModifiedDate,
  imageUrl,
  imageFullUrl,
  isInstantPotRecipe,
  userName,
}: Props) {
  return (
    <div
      className={`
        grid grid-cols-1 gap-8
        md:grid-cols-12
      `}
    >
      <div
        className={`
          md:col-span-4
          lg:col-span-3
        `}
      >
        <IngredientList ingredients={ingredients} servingCount={servingCount} />
      </div>

      <div
        className={`
          md:col-span-6
          lg:col-span-7
        `}
      >
        <h3 className="mb-2 text-xl font-medium">Postup</h3>
        {isInstantPotRecipe && (
          <Card className="mb-6">
            <Alert>
              <AlertDescription>
                <strong>Instant Pot</strong>
                <br />
                Tento recept je určený pro multifunkční hrnec Instant Pot nebo
                jeho kopie, např. česká Tesla EliteCook K70.
              </AlertDescription>
            </Alert>
          </Card>
        )}
        <Card>
          {directions ? (
            <div className="p-6">
              <RichText text={directions} />
            </div>
          ) : (
            <Alert>
              <AlertDescription>Žádný postup.</AlertDescription>
            </Alert>
          )}
        </Card>
      </div>

      <div className="md:col-span-2">
        <div className="md:pt-10">
          {imageUrl && (
            <Card className="overflow-hidden p-0">
              <RecipeImage
                imageUrl={imageUrl}
                imageFullUrl={imageFullUrl}
                title={title}
              />
            </Card>
          )}
          <div className="my-4">
            {userName && (
              <>
                <p className="text-sm text-muted-foreground">Autor:</p>
                <p>{userName}</p>
              </>
            )}
            <p
              className={cn(
                'text-sm text-muted-foreground',
                userName && 'mt-2',
              )}
            >
              Naposledy upraveno:
            </p>
            <p>{new Date(lastModifiedDate).toLocaleDateString('cs')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
