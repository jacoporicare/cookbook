import { CALL_API } from '../../middleware/api2';

export const RECIPE_LIST_FETCH = 'RECIPE_LIST.FETCH';
export const RECIPE_LIST_FETCH_SUCCESS = 'RECIPE_LIST.FETCH.SUCCESS';
export const RECIPE_LIST_FETCH_FAILURE = 'RECIPE_LIST.FETCH.FAILURE';

export const recipeListFetch = () => ({
  type: RECIPE_LIST_FETCH,
});

export const recipeListFetchSuccess = recipes => ({
  type: RECIPE_LIST_FETCH_SUCCESS,
  payload: {
    recipes,
  },
});

export const recipeListFetchFailure = (errorMessage, response) => ({
  type: RECIPE_LIST_FETCH_FAILURE,
  payload: {
    errorMessage,
    response,
  },
});

export const fetchRecipeList = () => ({
  [CALL_API]: {
    actions: [recipeListFetch, recipeListFetchSuccess, recipeListFetchFailure],
    url: '/api/recipes',
  },
});
