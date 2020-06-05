import flow from 'lodash.flow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import slug from 'slug';

import { useAuth } from '../AuthContext';
import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import RecipeList from '../components/RecipeList/RecipeList';
import Search from '../components/RecipeList/Search';
import Icon from '../components/common/Icon';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import { BoxSection, Text } from '../components/core';
import { Button, DangerAlert, InfoAlert } from '../components/elements';
import { useRecipeListQuery } from '../generated/graphql';
import { colors } from '../styles/colors';

function RecipeListPage() {
  const router = useRouter();
  const searchTags = router.query.tagy?.toString().split(' ') ?? [];

  const [token] = useAuth();
  const [searchVisible, setSearchVisible] = useState(searchTags.length > 0);
  const [matchAll, setMatchAll] = useState(false);
  const { data, error, loading } = useRecipeListQuery();

  function handleSearchVisibilityToggle() {
    setSearchVisible(!searchVisible);

    if (searchVisible) {
      handleSearch([]);
    }
  }

  function handleSearch(tags: string[]) {
    router.push(tags.length > 0 ? `/?tagy=${tags.join('+')}` : '/');
  }

  function handleMatchAllChange(matchAll: boolean) {
    setMatchAll(matchAll);
  }

  if (error) {
    return (
      <Layout>
        <DangerAlert>Nastala neočekávná chyba.</DangerAlert>
      </Layout>
    );
  }

  const tagOptions: { value: string; label: string }[] =
    data?.tags.map(t => ({ value: slug(t), label: t })) ?? [];
  const allRecipes = data?.recipes ?? [];
  const recipes =
    searchTags.length > 0
      ? allRecipes.filter(recipe =>
          matchAll
            ? searchTags.every(t => recipe.tags?.map(t => slug(t)).includes(t))
            : searchTags.some(t => recipe.tags?.map(t => slug(t)).includes(t)),
        )
      : allRecipes;
  const isEmpty = recipes.length === 0;

  return (
    <Layout>
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
                <Link href="/novy-recept" passHref>
                  <Button as="a">
                    <Icon icon="utensils" />
                    Nový recept
                  </Button>
                </Link>
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
            selectedTags={searchTags}
            tagOptions={tagOptions}
            onMatchAllChange={handleMatchAllChange}
            onSearch={handleSearch}
          />
        )}
        {isEmpty ? (
          <SpinnerIf spinner={loading}>
            <InfoAlert>Žádné recepty.</InfoAlert>
          </SpinnerIf>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </BoxSection>
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeListPage);
