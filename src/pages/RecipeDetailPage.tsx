import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { notify } from 'react-notify-toast';

import { useAuth } from '../AuthContext';
import DocumentTitle from '../components/common/DocumentTitle';
import Spinner from '../components/common/Spinner';
import SpinnerIf from '../components/common/SpinnerIf';
import { DangerAlert } from '../components/elements';
import RecipeDeleteModal from '../components/RecipeDeleteModal/RecipeDeleteModal';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import { recipeBaseFragment } from '../components/RecipeList/RecipeListItem';
import { RecipeDetail as RecipeDetailType, User } from '../types';
import { getImageUrl } from '../utils';
import { RecipeListQueryData, RECIPE_LIST_QUERY } from './RecipeListPage';

type Params = {
  slug: string;
};

type Props = RouteComponentProps<Params>;

export const recipeDetailFragment = gql`
  fragment recipeDetail on Recipe {
    ...recipeBase
    directions
    servingCount
    ingredients {
      _id
      name
      amount
      amountUnit
      isGroup
    }
  }

  ${recipeBaseFragment}
`;

export const RECIPE_DETAIL_QUERY = gql`
  query RecipeDetail($slug: String!) {
    recipe(slug: $slug) {
      ...recipeDetail
    }

    me {
      id
      username
      name
    }
  }

  ${recipeDetailFragment}
`;

export type RecipeDetailQueryData = {
  recipe?: RecipeDetailType;
  me?: User;
};

export const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

function RecipeDetailPage(props: Props) {
  const [token] = useAuth();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { data, loading } = useQuery<RecipeDetailQueryData>(RECIPE_DETAIL_QUERY, {
    variables: { slug: props.slug },
  });
  const deleteRecipe = useMutation<boolean>(DELETE_RECIPE_MUTATION, {
    update: (store, result) => {
      if (!result.data || !result.data) {
        return;
      }

      const data = store.readQuery<RecipeListQueryData>({ query: RECIPE_LIST_QUERY });

      if (!data) {
        return;
      }

      data.recipes = data.recipes.filter(r => r.slug !== props.slug);

      store.writeQuery({ query: RECIPE_LIST_QUERY, data });
    },
  });

  const recipe = data && data.recipe;

  function handleDeleteConfirm() {
    if (!recipe) {
      return;
    }

    deleteRecipe({ variables: { id: recipe._id } }).then(() => {
      notify.show('Recept smazán', 'success');
      props.navigate && props.navigate('/');
    });
  }

  if (!recipe) {
    return (
      <SpinnerIf spinner={loading}>
        <DangerAlert>Recept nenalezen.</DangerAlert>
      </SpinnerIf>
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
    title,
    hasImage,
    userId,
    userName,
  } = recipe;

  const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : undefined;
  const imageFullUrl = hasImage ? getImageUrl(slug, lastModifiedDate, 'full') : undefined;

  return (
    <>
      <DocumentTitle title={title} />
      <RecipeHeader
        preparationTime={preparationTime}
        sideDish={sideDish}
        slug={slug}
        title={title}
        isAuthor={Boolean(
          token &&
            data &&
            data.me &&
            (data.me.id === userId || data.me.id === 1 || data.me.id === 2),
        )}
        onDeleteShow={() => setDeleteModalVisible(true)}
      />
      {loading && <Spinner />}
      {/* {!hasDetail && !isOnline() && (
          <WarningAlert>
            <strong>Žádné připojení k internetu.</strong>
            <br />
            Recept se zobrazí v offline módu pouze po předchozím načtení.
          </WarningAlert>
        )} */}
      {/* {hasDetail && ( */}
      <RecipeDetail
        ingredients={ingredients}
        servingCount={servingCount}
        directions={directions}
        lastModifiedDate={lastModifiedDate}
        imageUrl={imageUrl}
        imageFullUrl={imageFullUrl}
        userName={userName}
      />
      {/* )} */}
      <RecipeDeleteModal
        show={deleteModalVisible}
        recipeTitle={title}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default RecipeDetailPage;
