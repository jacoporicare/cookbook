'use client';

import { Alert, AlertColor, Box, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '../../AuthProvider';
import Layout from '@/components/Layout';
import RecipeDeleteModal from '@/components/RecipeDeleteModal/RecipeDeleteModal';
import RecipeDetail from '@/components/RecipeDetail/RecipeDetail';
import RecipeHeader from '@/components/RecipeDetail/RecipeHeader';
import Spinner from '@/components/common/Spinner';
import SpinnerIf from '@/components/common/SpinnerIf';
import { INSTANT_POT_TAG } from '@/const';
import {
  RecipeListDocument,
  RecipeListQuery,
  useDeleteRecipeMutation,
  useMeQuery,
  useRecipeDetailQuery,
} from '@/generated/graphql';
type Props = {
  slug: string;
};

export default function RecipeDetailPage({ slug: querySlug }: Props) {
  const [token] = useAuth();
  const router = useRouter();

  const [snackbar, setSnackbar] = useState<[AlertColor, string]>();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { data: recipeData, loading: recipeLoading } = useRecipeDetailQuery({
    variables: { slug: querySlug },
  });
  const { data: meData, loading: meLoading } = useMeQuery({
    skip: !token,
  });
  const [deleteRecipe] = useDeleteRecipeMutation({
    onCompleted: () => {
      router.push('/');
    },
    onError: () => {
      setSnackbar(['error', 'Nastala neočekávaná chyba']);
    },
    update: (store, result) => {
      if (!result.data || !result.data) {
        return;
      }

      const cacheData = store.readQuery<RecipeListQuery>({ query: RecipeListDocument });

      if (!cacheData) {
        return;
      }

      const data = {
        ...cacheData,
        recipes: cacheData.recipes.filter(r => r.slug !== querySlug),
      };

      store.writeQuery({ query: RecipeListDocument, data });
    },
  });

  const recipe = recipeData?.recipe;
  const me = meData?.me;
  const loading = recipeLoading || meLoading;

  function handleDeleteConfirm() {
    if (!recipe) {
      return;
    }

    deleteRecipe({ variables: { id: recipe.id } });
  }

  if (!recipe) {
    return (
      <Layout>
        <SpinnerIf spinner={loading}>
          <Alert elevation={1} severity="error">
            Recept nenalezen.
          </Alert>
        </SpinnerIf>
      </Layout>
    );
  }

  const {
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

  return (
    <>
      <Layout>
        <Box component="article">
          <RecipeHeader
            isAuthor={Boolean(me && (me.username === user.username || me.isAdmin))}
            preparationTime={preparationTime ?? undefined}
            sideDish={sideDish ?? undefined}
            slug={slug}
            tags={tags ?? undefined}
            title={title}
            onDeleteShow={() => setDeleteModalVisible(true)}
          />
          {loading && <Spinner />}
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
        </Box>
      </Layout>
      <Snackbar autoHideDuration={5000} open={!!snackbar} onClose={() => setSnackbar(undefined)}>
        <Alert severity={snackbar?.[0]} onClose={() => setSnackbar(undefined)}>
          {snackbar?.[1]}
        </Alert>
      </Snackbar>
    </>
  );
}
