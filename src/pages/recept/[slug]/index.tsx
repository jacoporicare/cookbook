import { Box, Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useAuth } from '../../../AuthContext';
import { withApollo } from '../../../apollo';
import { withAuth } from '../../../auth';
import Layout from '../../../components/Layout';
import RecipeDeleteModal from '../../../components/RecipeDeleteModal/RecipeDeleteModal';
import RecipeDetail from '../../../components/RecipeDetail/RecipeDetail';
import RecipeHeader from '../../../components/RecipeDetail/RecipeHeader';
import DocumentTitle from '../../../components/common/DocumentTitle';
import Spinner from '../../../components/common/Spinner';
import SpinnerIf from '../../../components/common/SpinnerIf';
import {
  RecipeListQuery,
  RecipeListDocument,
  useRecipeDetailQuery,
  useDeleteRecipeMutation,
} from '../../../generated/graphql';
import useSupportsWebP from '../../../hooks/useSupportsWebP';

function RecipeDetailPage() {
  const [token] = useAuth();
  const router = useRouter();
  const supportsWebP = useSupportsWebP();

  const querySlug = router.query.slug?.toString();

  const [snackbar, setSnackbar] = useState<[Color, string]>();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { data, loading } = useRecipeDetailQuery({
    variables: { slug: querySlug! },
    skip: !querySlug,
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

  const recipe = data && data.recipe;

  function handleDeleteConfirm() {
    if (!recipe) {
      return;
    }

    deleteRecipe({ variables: { id: recipe._id } });
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
    image,
    user,
  } = recipe;

  return (
    <>
      <Layout>
        <Box component="article">
          <DocumentTitle title={title} />
          <RecipeHeader
            isAuthor={Boolean(
              token && data && data.me && (data.me.username === user.username || data.me.isAdmin),
            )}
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
            imageFullUrl={image?.fullUrl}
            imageUrl={supportsWebP ? image?.thumbWebPUrl : image?.thumbUrl}
            ingredients={ingredients ?? undefined}
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

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeDetailPage);
