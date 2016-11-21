import { CALL_API } from '../middleware/api';

import {
  RECIPES_REQUEST,
  RECIPES_SUCCESS,
  RECIPES_FAILURE
} from '../constants/actionTypes';

const fetchRecipes = () => ({
  [CALL_API]: {
    types: [RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE],
    url: '/api/recipes'
  }
});

export const loadRecipes = () => (dispatch, getState) => {
  const { recipes } = getState();
  if (!recipes.isFetching) {
    return dispatch(fetchRecipes());
  }
};
