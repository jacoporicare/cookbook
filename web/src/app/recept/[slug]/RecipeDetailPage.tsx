import { Layout } from '@/components/Layout';
import { RecipeDetail } from '@/components/RecipeDetail/RecipeDetail';
import { RecipeHeader } from '@/components/RecipeDetail/RecipeHeader';
import { INSTANT_POT_TAG } from '@/const';
import { RecipeBaseFragment, RecipeDetailQuery } from '@/generated/graphql';
import { User } from '@/types/user';

type Props = {
  recipe: NonNullable<RecipeDetailQuery['recipe']>;
  recipes: RecipeBaseFragment[];
  currentUser: User;
  isAuthor: boolean;
};

export function RecipeDetailPage({
  recipe,
  recipes,
  currentUser,
  isAuthor,
}: Props) {
  const {
    id,
    directions,
    ingredients,
    lastModifiedDate,
    preparationTime,
    servingCount,
    sideDish,
    slug,
    sousVideOptions,
    tags,
    title,
    imageUrl,
    user,
  } = recipe;

  return (
    <Layout recipes={recipes} user={currentUser}>
      <article>
        <RecipeHeader
          id={id}
          isAuthor={isAuthor}
          preparationTime={preparationTime ?? undefined}
          sideDish={sideDish ?? undefined}
          slug={slug}
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
    </Layout>
  );
}
