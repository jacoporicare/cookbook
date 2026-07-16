import { ReactNode } from 'react';

import { RecipeDetail } from '@/components/RecipeDetail/RecipeDetail';
import { RecipeHeader } from '@/components/RecipeDetail/RecipeHeader';
import { INSTANT_POT_TAG } from '@/const';
import { RecipeDetailQuery } from '@/generated/graphql';

type Props = {
  recipe: NonNullable<RecipeDetailQuery['recipe']>;
  authorControls: ReactNode;
};

export function RecipeDetailPage({ recipe, authorControls }: Props) {
  const {
    directions,
    ingredients,
    lastModifiedDate,
    preparationTime,
    servingCount,
    sideDish,
    sousVideOptions,
    tags,
    title,
    imageUrl,
    user,
  } = recipe;

  return (
    <article>
      <RecipeHeader
        actions={authorControls}
        preparationTime={preparationTime ?? undefined}
        sideDish={sideDish ?? undefined}
        tags={tags ?? undefined}
        title={title}
      />
      <RecipeDetail
        directions={directions ?? undefined}
        imageFullUrl={imageUrl ?? undefined}
        imageUrl={imageUrl ?? undefined}
        ingredients={ingredients ?? undefined}
        isInstantPotRecipe={tags.includes(INSTANT_POT_TAG)}
        lastModifiedDate={lastModifiedDate}
        preparationTime={preparationTime ?? undefined}
        servingCount={servingCount ?? undefined}
        sousVideOptions={sousVideOptions ?? undefined}
        title={title}
        userName={user?.displayName}
      />
    </article>
  );
}
