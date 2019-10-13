import React from 'react';

import { Box } from '../core';
import { Button } from '../elements';

type Props = {
  offlineRecipeCount: number;
  totalRecipeCount: number;
  onFetchAllRecipesClick: () => void;
  isFetchingAllRecipes: boolean;
};

function OfflineRecipes({
  offlineRecipeCount,
  totalRecipeCount,
  onFetchAllRecipesClick,
  isFetchingAllRecipes,
}: Props) {
  return (
    <Box alignItems="center" color="#999" display="flex" mt={3}>
      <span>
        Počet receptů dostupných offline: <b>{offlineRecipeCount}</b> / <b>{totalRecipeCount}</b>
      </span>
      {offlineRecipeCount < totalRecipeCount && (
        <Button disabled={isFetchingAllRecipes} ml={3} onClick={onFetchAllRecipesClick}>
          {isFetchingAllRecipes ? <>Stahování&hellip;</> : <>Stáhnout vše</>}
        </Button>
      )}
    </Box>
  );
}

export default OfflineRecipes;
