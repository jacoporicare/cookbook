import { CALL_API } from '../middleware/api';

export const RECIPES_REQUEST = 'RECIPES_REQUEST';
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS';
export const RECIPES_FAILURE = 'RECIPES_FAILURE';

const fetchRecipes = () => ({
  [CALL_API]: {
    types: [RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE],
    url: '/api/recipes'
  }
});

export const loadRecipes = () => (dispatch, getState) => {
  const { recipes } = getState();

  if (!recipes.isFetching) {
    dispatch(fetchRecipes());
  }
};
