import { CALL_API } from '../middleware/api';
import {
  RECIPE_DETAIL_REQUEST,
  RECIPE_DETAIL_SUCCESS,
  RECIPE_DETAIL_FAILURE
} from '../constants/actionTypes';

const fetchRecipe = slug => ({
  slug,
  [CALL_API]: {
    types: [RECIPE_DETAIL_REQUEST, RECIPE_DETAIL_SUCCESS, RECIPE_DETAIL_FAILURE],
    url: `/api/recipes/${slug}`
  }
});

export const loadRecipe = slug => (dispatch, getState) => {
  const { recipeDetails } = getState();
  const recipeDetail = recipeDetails[slug];

  if (!recipeDetail || !recipeDetail.isFetching) {
    return dispatch(fetchRecipe(slug));
  }
};
