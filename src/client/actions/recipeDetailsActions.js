import { CALL_API } from '../middleware/api';

export const RECIPE_DETAIL_REQUEST = 'RECIPE_DETAIL_REQUEST';
export const RECIPE_DETAIL_SUCCESS = 'RECIPE_DETAIL_SUCCESS';
export const RECIPE_DETAIL_FAILURE = 'RECIPE_DETAIL_FAILURE';

export const RECIPE_SAVE_REQUEST = 'RECIPE_SAVE_REQUEST';
export const RECIPE_SAVE_SUCCESS = 'RECIPE_SAVE_SUCCESS';
export const RECIPE_SAVE_FAILURE = 'RECIPE_SAVE_FAILURE';

export const RECIPE_DELETE_REQUEST = 'RECIPE_DELETE_REQUEST';
export const RECIPE_DELETE_SUCCESS = 'RECIPE_DELETE_SUCCESS';
export const RECIPE_DELETE_FAILURE = 'RECIPE_DELETE_FAILURE';

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

export const createRecipe = recipe => ({
  [CALL_API]: {
    types: [RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAILURE],
    url: '/api/recipes',
    method: 'post',
    data: recipe
  }
});

export const saveRecipe = recipe => ({
  [CALL_API]: {
    types: [RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAILURE],
    url: `/api/recipes/${recipe._id}`,
    method: 'post',
    data: recipe
  }
});

export const deleteRecipe = id => ({
  id,
  [CALL_API]: {
    types: [RECIPE_DELETE_REQUEST, RECIPE_DELETE_SUCCESS, RECIPE_DELETE_FAILURE],
    url: `/api/recipes/${id}`,
    method: 'delete'
  }
});
