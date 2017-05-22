import { CALL_API } from '../../middleware/api';

export const RECIPE_LIST_FETCH = 'RECIPE_LIST.FETCH';
export const RECIPE_LIST_FETCH_SUCCESS = 'RECIPE_LIST.FETCH.SUCCESS';
export const RECIPE_LIST_FETCH_FAILURE = 'RECIPE_LIST.FETCH.FAILURE';

export const recipeListFetch = () => ({
  [CALL_API]: {
    types: [
      RECIPE_LIST_FETCH,
      RECIPE_LIST_FETCH_SUCCESS,
      RECIPE_LIST_FETCH_FAILURE,
    ],
    url: '/api/recipes',
  },
});
