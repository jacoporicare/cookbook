'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteRecipeAction } from '@/app/actions/recipe';
import { Layout } from '@/components/Layout';
import { RecipeDeleteModal } from '@/components/RecipeDeleteModal/RecipeDeleteModal';
import { RecipeDetail } from '@/components/RecipeDetail/RecipeDetail';
import { RecipeHeader } from '@/components/RecipeDetail/RecipeHeader';
import { Spinner } from '@/components/common/Spinner';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get('saved') === 'true') {
      toast.success('Recept úspěšně uložen');
      window.history.replaceState(null, '', `/recept/${recipe.slug}`);
    }
  }, [searchParams, recipe.slug]);

  const {
    id,
    directions,
    ingredients,
    lastModifiedDate,
    preparationTime,
    servingCount,
    sideDish,
    slug,
    tags,
    title,
    imageWebPUrl,
    imageThumbWebPUrl,
    user,
  } = recipe;

  function handleDeleteConfirm() {
    startTransition(async () => {
      const result = await deleteRecipeAction(id);
      if (result.error) {
        toast.error(result.error);
        setDeleteModalVisible(false);
      } else {
        router.push('/');
      }
    });
  }

  return (
    <Layout recipes={recipes} user={currentUser}>
      <article>
        <RecipeHeader
          isAuthor={isAuthor}
          preparationTime={preparationTime ?? undefined}
          sideDish={sideDish ?? undefined}
          slug={slug}
          tags={tags ?? undefined}
          title={title}
          onDeleteShow={() => setDeleteModalVisible(true)}
        />
        {isPending && <Spinner />}
        <RecipeDetail
          directions={directions ?? undefined}
          imageFullUrl={imageWebPUrl ?? undefined}
          imageUrl={imageThumbWebPUrl ?? undefined}
          ingredients={ingredients ?? undefined}
          isInstantPotRecipe={tags.includes(INSTANT_POT_TAG)}
          lastModifiedDate={lastModifiedDate}
          servingCount={servingCount ?? undefined}
          title={title}
          userName={user.displayName}
        />
        <RecipeDeleteModal
          recipeTitle={title}
          show={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteConfirm}
        />
      </article>
    </Layout>
  );
}
