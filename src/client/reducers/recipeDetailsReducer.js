import initialState from './initialState';
import {
  REQUEST_RECIPE_DETAIL,
  RECEIVE_RECIPE_DETAIL
} from '../constants/actionTypes';

export default function (state = initialState.recipeDetails, action) {
  switch (action.type) {
    case REQUEST_RECIPE_DETAIL:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: true
        }
      };

    case RECEIVE_RECIPE_DETAIL:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: false,
          recipe: action.recipe
        }
      };

    default:
      return state;
  }
}
