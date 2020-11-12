import { Box } from '@material-ui/core';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { notify } from 'react-notify-toast';

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
import { DangerAlert } from '../../../components/elements';
import {
  RecipeListQuery,
  RecipeListDocument,
  useRecipeDetailQuery,
  useDeleteRecipeMutation,
} from '../../../generated/graphql';

function RecipeDetailPage() {
  const [token] = useAuth();
  const router = useRouter();

  const querySlug = router.query.slug?.toString();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { data, loading } = useRecipeDetailQuery({
    variables: { slug: querySlug! },
    skip: !querySlug,
  });
  const [deleteRecipe] = useDeleteRecipeMutation({
    onCompleted: () => {
      notify.show('Recept smazán', 'success');
      router.push('/');
    },
    onError: () => {
      notify.show('Nastala neočekávaná chyba', 'error');
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
          <DangerAlert>Recept nenalezen.</DangerAlert>
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
    <Layout>
      <Box component="article">
        <DocumentTitle title={title} />
        <RecipeHeader
          isAuthor={Boolean(
            token && data && data.me && (data.me.username === user.username || data.me.isAdmin),
          )}
          preparationTime={preparationTime}
          sideDish={sideDish}
          slug={slug}
          tags={tags}
          title={title}
          onDeleteShow={() => setDeleteModalVisible(true)}
        />
        {loading && <Spinner />}
        <RecipeDetail
          directions={directions}
          imageFullUrl={image?.fullUrl}
          imageUrl={image?.thumbUrl}
          ingredients={ingredients}
          lastModifiedDate={lastModifiedDate}
          servingCount={servingCount}
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
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeDetailPage);
