import { CALL_API } from '../../middleware/api2';

export const RECIPE_FETCH = 'RECIPE.FETCH';
export const RECIPE_FETCH_SUCCESS = 'RECIPE.FETCH.SUCCESS';
export const RECIPE_FETCH_FAILURE = 'RECIPE.FETCH.FAILURE';

export const RECIPE_DELETE = 'RECIPE.DELETE';
export const RECIPE_DELETE_SUCCESS = 'RECIPE.DELETE.SUCCESS';
export const RECIPE_DELETE_FAILURE = 'RECIPE.DELETE.FAILURE';

export const recipeFetch = () => ({
  type: RECIPE_FETCH,
});

export const recipeFetchSuccess = (recipe, slug) => ({
  type: RECIPE_FETCH_SUCCESS,
  payload: {
    recipe,
    slug,
  },
});

export const recipeFetchFailure = (errorMessage, response) => ({
  type: RECIPE_FETCH_FAILURE,
  payload: {
    errorMessage,
    response,
  },
});

export const fetchRecipe = slug => ({
  [CALL_API]: {
    actions: [
      recipeFetch,
      recipe => recipeFetchSuccess(recipe, slug),
      recipeFetchFailure,
    ],
    url: `/api/recipes/${slug}`,
  },
});

export const recipeDelete = () => ({
  type: RECIPE_DELETE,
});

export const recipeDeleteSuccess = id => ({
  type: RECIPE_DELETE_SUCCESS,
  payload: {
    id,
  },
});

export const recipeDeleteFailure = () => ({
  type: RECIPE_DELETE_FAILURE,
});

export const deleteRecipe = id => ({
  [CALL_API]: {
    actions: [recipeDelete, () => recipeDeleteSuccess(id), recipeDeleteFailure],
    url: `/api/recipes/${id}`,
    method: 'delete',
  },
});
