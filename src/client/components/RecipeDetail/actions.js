import { CALL_API } from '../../middleware/api';

export const RECIPE_FETCH = 'RECIPE.FETCH';
export const RECIPE_FETCH_SUCCESS = 'RECIPE.FETCH.SUCCESS';
export const RECIPE_FETCH_FAILURE = 'RECIPE.FETCH.FAILURE';

export const RECIPE_DELETE = 'RECIPE.DELETE';
export const RECIPE_DELETE_SUCCESS = 'RECIPE.DELETE.SUCCESS';
export const RECIPE_DELETE_FAILURE = 'RECIPE.DELETE.FAILURE';

export const fetchRecipe = slug => ({
  slug,
  [CALL_API]: {
    types: [RECIPE_FETCH, RECIPE_FETCH_SUCCESS, RECIPE_FETCH_FAILURE],
    url: `/api/recipes/${slug}`,
  },
});

export const deleteRecipe = id => ({
  id,
  [CALL_API]: {
    types: [RECIPE_DELETE, RECIPE_DELETE_SUCCESS, RECIPE_DELETE_FAILURE],
    url: `/api/recipes/${id}`,
    method: 'delete',
  },
});
