import { Button, Fab, Typography } from '@material-ui/core';
import { Add, Close, FilterList } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import flow from 'lodash.flow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import slug from 'slug';

import { useAuth } from '../AuthContext';
import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import RecipeList from '../components/RecipeList/RecipeList';
import Search from '../components/RecipeList/Search';
import FabContainer from '../components/common/FabContainer';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import { useRecipeListQuery } from '../generated/graphql';

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
        <Alert severity="error">Nastala neočekávná chyba.</Alert>
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
      <section>
        <PageHeading
          buttons={
            <Button
              startIcon={searchVisible ? <Close /> : <FilterList />}
              variant="outlined"
              onClick={handleSearchVisibilityToggle}
            >
              {searchVisible ? 'Zrušit' : 'Filtr'}
            </Button>
          }
        >
          Recepty{' '}
          <Typography color="textSecondary" component="span" variant="h5">
            {recipes.length}
          </Typography>
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
            <Alert severity="info">Žádné recepty.</Alert>
          </SpinnerIf>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </section>
      {token && (
        <FabContainer>
          <Link href="/novy-recept" passHref>
            <Fab aria-label="Nový recept" color="primary" component="a">
              <Add fontSize="large" />
            </Fab>
          </Link>
        </FabContainer>
      )}
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeListPage);
