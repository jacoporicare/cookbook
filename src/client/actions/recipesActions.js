import axios from 'axios';
import ms from 'ms';
import {
  INVALIDATE_RECIPES,
  REQUEST_RECIPES,
  RECEIVE_RECIPES
} from '../constants/actionTypes';

export const invalidateRecipes = () => ({
  type: INVALIDATE_RECIPES
});

export const requestRecipes = () => ({
  type: REQUEST_RECIPES
});

export const receiveRecipes = recipes => ({
  type: RECEIVE_RECIPES,
  recipes
});

const fetchRecipes = () => dispatch => {
  dispatch(requestRecipes());
  return axios.get('/api/recipes')
    .then(response => dispatch(receiveRecipes(response.data)));
};

const shouldFetchRecipes = recipes => {
  if (recipes.isFetching) {
    return false;
  }
  if (!recipes.lastUpdated || (Date.now() - recipes.lastUpdated) > ms('15m')) {
    return true;
  }
  return recipes.didInvalidate;
};

export const fetchRecipesIfNeeded = () => (dispatch, getState) => {
  const { recipes } = getState();
  if (shouldFetchRecipes(recipes)) {
    return dispatch(fetchRecipes());
  }
};
