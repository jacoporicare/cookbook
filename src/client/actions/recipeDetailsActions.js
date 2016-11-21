import axios from 'axios';
import ms from 'ms';
import {
  REQUEST_RECIPE_DETAIL,
  RECEIVE_RECIPE_DETAIL
} from '../constants/actionTypes';

export const requestRecipe = slug => ({
  type: REQUEST_RECIPE_DETAIL,
  slug
});

export const receiveRecipe = (slug, recipe) => ({
  type: RECEIVE_RECIPE_DETAIL,
  slug,
  recipe
});

const fetchRecipe = slug => dispatch => {
  dispatch(requestRecipe(slug));
  return axios.get(`/api/recipes/by-slug/${slug}`)
    .then(response => dispatch(receiveRecipe(slug, response.data)));
};

export const loadRecipe = slug => (dispatch, getState) => {
  const { recipeDetails } = getState();
  const recipeDetail = recipeDetails[slug];

  if (!recipeDetail || !recipeDetail.isFetching) {
    return dispatch(fetchRecipe(slug));
  }
};
