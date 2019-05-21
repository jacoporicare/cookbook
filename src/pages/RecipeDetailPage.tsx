import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';

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

type Params = {
  slug: string;
};

type Props = RouteComponentProps<Params>;

const QUERY = gql`
  query RecipeDetail($slug: String!) {
    recipe(slug: $slug) {
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

    me {
      id
      username
      name
    }
  }

  ${recipeBaseFragment}
`;

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

function RecipeDetailPage(props: Props) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { data, loading } = useQuery<{ recipe?: RecipeDetailType; me?: User }>(QUERY, {
    variables: { slug: props.slug },
  });
  const deleteRecipe = useMutation(DELETE_RECIPE_MUTATION);

  const recipe = data && data.recipe;

  function handleDeleteConfirm() {
    if (!recipe) {
      return;
    }

    deleteRecipe({ variables: { id: recipe._id } }).then(() => {
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
        isAuthor={
          data && data.me && (data.me.id === userId || data.me.id === 1 || data.me.id === 2)
        }
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
