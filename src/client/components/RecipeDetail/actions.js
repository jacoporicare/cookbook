import { CALL_API } from '../../middleware/api2';

export const RECIPE_FETCH_REQUEST = 'RECIPE.FETCH.REQUEST';
export const RECIPE_FETCH_SUCCESS = 'RECIPE.FETCH.SUCCESS';
export const RECIPE_FETCH_FAILURE = 'RECIPE.FETCH.FAILURE';

export const RECIPE_DELETE_REQUEST = 'RECIPE.DELETE.REQUEST';
export const RECIPE_DELETE_SUCCESS = 'RECIPE.DELETE.SUCCESS';
export const RECIPE_DELETE_FAILURE = 'RECIPE.DELETE.FAILURE';

export const fetchRecipeRequest = () => ({
  type: RECIPE_FETCH_REQUEST,
});

export const fetchRecipeSuccess = (recipe, slug) => ({
  type: RECIPE_FETCH_SUCCESS,
  payload: {
    recipe,
    slug,
  },
});

export const fetchRecipeFailure = (errorMessage, response) => ({
  type: RECIPE_FETCH_FAILURE,
  payload: {
    errorMessage,
    response,
  },
});

export const fetchRecipe = slug => ({
  [CALL_API]: {
    actions: [
      fetchRecipeRequest,
      recipe => fetchRecipeSuccess(recipe, slug),
      fetchRecipeFailure,
    ],
    url: `/api/recipes/${slug}`,
  },
});

export const deleteRecipeRequest = () => ({
  type: RECIPE_DELETE_REQUEST,
});

export const deleteRecipeSuccess = id => ({
  type: RECIPE_DELETE_SUCCESS,
  payload: {
    id,
  },
});

export const deleteRecipeFailure = () => ({
  type: RECIPE_DELETE_FAILURE,
});

export const deleteRecipe = id => ({
  [CALL_API]: {
    actions: [
      deleteRecipeRequest,
      () => deleteRecipeSuccess(id),
      deleteRecipeFailure,
    ],
    url: `/api/recipes/${id}`,
    method: 'delete',
  },
});
