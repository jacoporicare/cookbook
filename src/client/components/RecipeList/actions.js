import { CALL_API } from '../../middleware/api';

export const RECIPE_LIST_FETCH_REQUEST = 'RECIPE_LIST.FETCH.REQUEST';
export const RECIPE_LIST_FETCH_SUCCESS = 'RECIPE_LIST.FETCH.SUCCESS';
export const RECIPE_LIST_FETCH_FAILURE = 'RECIPE_LIST.FETCH.FAILURE';

export const fetchRecipeListRequest = () => ({
  type: RECIPE_LIST_FETCH_REQUEST,
});

export const fetchRecipeListSuccess = recipes => ({
  type: RECIPE_LIST_FETCH_SUCCESS,
  payload: {
    recipes,
  },
});

export const fetchRecipeListFailure = (errorMessage, response) => ({
  type: RECIPE_LIST_FETCH_FAILURE,
  payload: {
    errorMessage,
    response,
  },
});

export const fetchRecipeList = () => ({
  [CALL_API]: {
    actions: [
      fetchRecipeListRequest,
      fetchRecipeListSuccess,
      fetchRecipeListFailure,
    ],
    url: '/api/recipes',
  },
});
