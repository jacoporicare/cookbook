import { useQuery } from '@apollo/react-hooks';
import { Link, RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import { useAuth } from '../AuthContext';
import RecipeList from '../components/RecipeList/RecipeList';
import { recipeBaseFragment } from '../components/RecipeList/RecipeListItem';
import Search from '../components/RecipeList/Search';
import Icon from '../components/common/Icon';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import { Text, BoxSection } from '../components/core';
import { Button, DangerAlert, InfoAlert } from '../components/elements';
import { colors } from '../styles/colors';
import { Recipe } from '../types';

type Props = RouteComponentProps;

const NewRecipeButton = Button.withComponent(Link);

export const RECIPE_LIST_QUERY = gql`
  query RecipeList {
    recipes {
      ...recipeBase
    }
  }

  ${recipeBaseFragment}
`;

export const RECIPE_LIST_TAGS_QUERY = gql`
  query RecipeListTags {
    tags
  }
`;

export type RecipeListQueryData = {
  recipes: Recipe[];
};

export type RecipeListTagsQueryData = {
  tags: string[];
};

function RecipeListPage(_props: Props) {
  // handleFetchAllRecipesClick = () => {
  //   this.props.fetchAllRecipes(
  //     this.props.recipes
  //       .filter(r => !this.props.offlineRecipeSlugs.includes(r.slug))
  //       .map(r => r.slug),
  //   );
  // };

  const [token] = useAuth();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [matchAll, setMatchAll] = useState(false);
  const { data, error, loading } = useQuery<RecipeListQueryData>(RECIPE_LIST_QUERY);
  const { data: dataTags } = useQuery<RecipeListTagsQueryData>(RECIPE_LIST_TAGS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  function handleSearchVisibilityToggle() {
    setSearchVisible(!searchVisible);

    if (searchVisible) {
      handleSearch([]);
    }
  }

  function handleSearch(tags: string[]) {
    setSearchTags(tags);
  }

  function handleMatchAllChange(matchAll: boolean) {
    setMatchAll(matchAll);
  }

  if (error) {
    return <DangerAlert>Nastala neočekávná chyba.</DangerAlert>;
  }

  const tags = dataTags?.tags ?? [];
  const allRecipes = data?.recipes ?? [];
  const recipes =
    searchTags.length > 0
      ? allRecipes.filter(recipe =>
          matchAll
            ? searchTags.every(t => recipe.tags?.includes(t))
            : searchTags.some(t => recipe.tags?.includes(t)),
        )
      : allRecipes;
  const isEmpty = recipes.length === 0;

  return (
    <BoxSection>
      <PageHeading
        buttons={
          <>
            <Button onClick={handleSearchVisibilityToggle}>
              {searchVisible ? (
                <>
                  <Icon icon="times" />
                  Zrušit
                </>
              ) : (
                <>
                  <Icon icon="tags" />
                  Tagy
                </>
              )}
            </Button>
            {token && (
              <NewRecipeButton to="/novy-recept">
                <Icon icon="utensils" />
                Nový recept
              </NewRecipeButton>
            )}
          </>
        }
      >
        Recepty{' '}
        <Text color={colors.gray600} fontSize="0.5em" fontWeight={200}>
          {recipes.length}
        </Text>
      </PageHeading>
      {searchVisible && (
        <Search
          multipleSelected={searchTags.length > 1}
          tagOptions={tags}
          onMatchAllChange={handleMatchAllChange}
          onSearch={handleSearch}
        />
      )}
      {isEmpty ? (
        <SpinnerIf spinner={loading}>
          <InfoAlert>Žádné recepty.</InfoAlert>
        </SpinnerIf>
      ) : (
        <>
          <RecipeList recipes={recipes} />
          {/* <OfflineRecipes
              offlineRecipeCount={offlineRecipeSlugs.length}
              totalRecipeCount={recipes.length}
              onFetchAllRecipesClick={this.handleFetchAllRecipesClick}
              isFetchingAllRecipes={isFetchingAllRecipes}
            /> */}
        </>
      )}
    </BoxSection>
  );
}

export default RecipeListPage;
