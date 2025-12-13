'use client';

import { Add, AutoAwesome, Close, FilterList } from '@mui/icons-material';
import { Alert, Button, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import slug from 'slug';

import Layout from '@/components/Layout';
import RecipeImportModal from '@/components/RecipeImport/RecipeImportModal';
import RecipeList from '@/components/RecipeList/RecipeList';
import Search from '@/components/RecipeList/Search';
import FabContainer from '@/components/common/FabContainer';
import PageHeading from '@/components/common/PageHeading';
import { INSTANT_POT_TAG, INSTANT_POT_TAG_SLUG } from '@/const';
import { RecipeListQuery } from '@/generated/graphql';
import useHideOnScroll from '@/hooks/useHideOnScroll';

type Props = {
  recipes: RecipeListQuery['recipes'];
  tags: RecipeListQuery['tags'];
  isLoggedIn: boolean;
};

export default function RecipeListPage({ recipes: allRecipesRaw, tags: allTags, isLoggedIn }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTags = searchParams.get('stitky')?.split(' ') ?? [];
  const isInstantPotPage = pathname === `/${INSTANT_POT_TAG_SLUG}`;

  const [searchVisible, setSearchVisible] = useState(searchTags.length > 0);
  const [matchAll, setMatchAll] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const fabHidden = useHideOnScroll();

  function handleSearchVisibilityToggle() {
    setSearchVisible(!searchVisible);

    if (searchVisible) {
      handleSearch([]);
    }
  }

  function handleSearch(tags: string[]) {
    router.push(tags.length > 0 ? `${pathname}?stitky=${tags.join('+')}` : pathname);
  }

  function handleMatchAllChange(matchAll: boolean) {
    setMatchAll(matchAll);
  }

  const tags = isInstantPotPage ? allTags.filter(t => t !== INSTANT_POT_TAG) : allTags;
  const tagOptions: { value: string; label: string }[] = tags.map(t => ({
    value: slug(t),
    label: t,
  }));
  const allRecipes = isInstantPotPage
    ? allRecipesRaw.filter(recipe => recipe.tags.includes(INSTANT_POT_TAG))
    : allRecipesRaw;
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
          <Alert elevation={1} severity="info">
            Žádné recepty.
          </Alert>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </section>
      {isLoggedIn && (
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
