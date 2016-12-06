import { CALL_API } from '../middleware/api';

export const RECIPE_DETAIL_REQUEST = 'RECIPE_DETAIL_REQUEST';
export const RECIPE_DETAIL_SUCCESS = 'RECIPE_DETAIL_SUCCESS';
export const RECIPE_DETAIL_FAILURE = 'RECIPE_DETAIL_FAILURE';

export const RECIPE_SAVE_REQUEST = 'RECIPE_SAVE_REQUEST';
export const RECIPE_SAVE_SUCCESS = 'RECIPE_SAVE_SUCCESS';
export const RECIPE_SAVE_FAILURE = 'RECIPE_SAVE_FAILURE';

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
    dispatch(fetchRecipe(slug));
  }
};

export const saveRecipe = recipe => ({
  [CALL_API]: {
    types: [RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAILURE],
    url: `/api/recipes/${recipe._id}`,
    method: 'post',
    data: recipe
  }
});
