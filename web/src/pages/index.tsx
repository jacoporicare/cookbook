import { Add, AutoAwesome, Close, FilterList } from '@mui/icons-material';
import { Alert, Button, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import { useState } from 'react';
import slug from 'slug';

import { useAuth } from '../AuthContext';
import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import RecipeImportModal from '../components/RecipeImport/RecipeImportModal';
import RecipeList from '../components/RecipeList/RecipeList';
import Search from '../components/RecipeList/Search';
import FabContainer from '../components/common/FabContainer';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import { INSTANT_POT_TAG, INSTANT_POT_TAG_SLUG } from '../const';
import { useRecipeListQuery } from '../generated/graphql';
import useHideOnScroll from '../hooks/useHideOnScroll';

function RecipeListPage() {
  const router = useRouter();
  const searchTags = router.query.stitky?.toString().split(' ') ?? [];
  const isInstantPotPage = router.pathname === `/${INSTANT_POT_TAG_SLUG}`;

  const [token] = useAuth();
  const [searchVisible, setSearchVisible] = useState(searchTags.length > 0);
  const [matchAll, setMatchAll] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const { data, error, loading } = useRecipeListQuery();
  const fabHidden = useHideOnScroll();

  function handleSearchVisibilityToggle() {
    setSearchVisible(!searchVisible);

    if (searchVisible) {
      handleSearch([]);
    }
  }

  function handleSearch(tags: string[]) {
    router.push(tags.length > 0 ? `${router.pathname}?stitky=${tags.join('+')}` : router.pathname);
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

  const tags =
    (isInstantPotPage ? data?.tags.filter(t => t !== INSTANT_POT_TAG) : data?.tags) ?? [];
  const tagOptions: { value: string; label: string }[] = tags.map(t => ({
    value: slug(t),
    label: t,
  }));
  const allRecipes =
    (isInstantPotPage
      ? data?.recipes.filter(recipe => recipe.tags.includes(INSTANT_POT_TAG))
      : data?.recipes) ?? [];
  const recipes =
    searchTags.length > 0
      ? allRecipes.filter(recipe =>
          matchAll
            ? searchTags.every(t => recipe.tags.some(rt => slug(rt) === t))
            : searchTags.some(t => recipe.tags.some(rt => slug(rt) === t)),
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
          {isInstantPotPage ? 'Instant Pot recepty' : 'Recepty'}{' '}
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
            <Alert elevation={1} severity="info">
              Žádné recepty.
            </Alert>
          </SpinnerIf>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </section>
      {token && (
        <FabContainer>
          <SpeedDial
            ariaLabel="Vytvořit recept"
            hidden={fabHidden}
            icon={<SpeedDialIcon />}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          >
            <SpeedDialAction
              icon={<Add />}
              tooltipTitle="Vytvořit nový"
              onClick={() => {
                router.push(
                  isInstantPotPage ? `/novy-recept?${INSTANT_POT_TAG_SLUG}` : '/novy-recept',
                );
              }}
            />
            <SpeedDialAction
              icon={<AutoAwesome />}
              tooltipTitle="Vytvořit pomocí AI"
              onClick={() => {
                setImportModalVisible(true);
              }}
            />
          </SpeedDial>
        </FabContainer>
      )}
      <RecipeImportModal show={importModalVisible} onClose={() => setImportModalVisible(false)} />
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeListPage);
