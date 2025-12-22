'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteRecipeAction } from '@/app/actions/recipe';
import Layout from '@/components/Layout';
import RecipeDeleteModal from '@/components/RecipeDeleteModal/RecipeDeleteModal';
import RecipeDetail from '@/components/RecipeDetail/RecipeDetail';
import RecipeHeader from '@/components/RecipeDetail/RecipeHeader';
import Spinner from '@/components/common/Spinner';
import { INSTANT_POT_TAG } from '@/const';
import { RecipeDetailQuery } from '@/generated/graphql';

type Props = {
  recipe: NonNullable<RecipeDetailQuery['recipe']>;
  isAuthor: boolean;
};

export default function RecipeDetailPage({ recipe, isAuthor }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
    <Layout>
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
