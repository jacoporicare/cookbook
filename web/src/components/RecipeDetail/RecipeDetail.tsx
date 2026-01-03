import { CookingPot } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Ingredient, SousVideOption } from '../../generated/graphql';
import { RichText } from '../RichText/RichText';
import { IngredientList } from './IngredientList';
import { RecipeImage } from './RecipeImage';
import { SousVideList } from './SousVideList';

type Props = {
  title: string;
  ingredients?: Omit<Ingredient, '_id'>[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: string;
  imageUrl?: string;
  imageFullUrl?: string;
  isInstantPotRecipe?: boolean;
  sousVideOptions?: Omit<SousVideOption, 'id'>[];
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
  sousVideOptions,
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
          flex flex-col gap-6
          md:col-span-4
          lg:col-span-3
        `}
      >
        <IngredientList ingredients={ingredients} servingCount={servingCount} />
        {sousVideOptions && sousVideOptions.length > 0 && (
          <SousVideList options={sousVideOptions} />
        )}
      </div>

      <div
        className={`
          md:col-span-6
          lg:col-span-7
        `}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CookingPot className="size-5" />
              Postup
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isInstantPotRecipe && (
              <Alert className="mb-8">
                <AlertDescription>
                  <strong>Instant Pot</strong>
                  Tento recept je určený pro multifunkční hrnec Instant Pot nebo
                  jeho kopie, např. česká Tesla EliteCook K70.
                </AlertDescription>
              </Alert>
            )}

            {directions ? (
              <RichText text={directions} />
            ) : (
              <Alert>
                <AlertDescription>Žádný postup.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
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
            className={cn('text-sm text-muted-foreground', userName && 'mt-2')}
          >
            Naposledy upraveno:
          </p>
          <p>{new Date(lastModifiedDate).toLocaleDateString('cs')}</p>
        </div>
      </div>
    </div>
  );
}
