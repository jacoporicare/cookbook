import React from 'react';

import { Box } from '../core';
import { Button } from '../elements';

type Props = {
  offlineRecipeCount: number;
  totalRecipeCount: number;
  onFetchAllRecipesClick: () => void;
  isFetchingAllRecipes: boolean;
};

export default function OfflineRecipes({
  offlineRecipeCount,
  totalRecipeCount,
  onFetchAllRecipesClick,
  isFetchingAllRecipes,
}: Props) {
  return (
    <Box display="flex" alignItems="center" color="#999" mt={3}>
      <span>
        Počet receptů dostupných offline: <b>{offlineRecipeCount}</b> / <b>{totalRecipeCount}</b>
      </span>
      {offlineRecipeCount < totalRecipeCount && (
        <Button onClick={onFetchAllRecipesClick} disabled={isFetchingAllRecipes} ml={3}>
          {isFetchingAllRecipes ? <>Stahování&hellip;</> : <>Stáhnout vše</>}
        </Button>
      )}
    </Box>
  );
}
