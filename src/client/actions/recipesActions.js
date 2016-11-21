import axios from 'axios';
import ms from 'ms';
import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES
} from '../constants/actionTypes';

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

export const loadRecipes = () => (dispatch, getState) => {
  const { recipes } = getState();
  if (!recipes.isFetching) {
    return dispatch(fetchRecipes());
  }
};
