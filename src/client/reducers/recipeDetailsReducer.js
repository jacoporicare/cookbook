import initialState from './initialState';
import {
  RECIPE_DETAIL_REQUEST,
  RECIPE_DETAIL_SUCCESS,
  RECIPE_DETAIL_FAILURE
} from '../actions/recipeDetailsActions';

export default function (state = initialState.recipeDetails, action) {
  switch (action.type) {
    case RECIPE_DETAIL_REQUEST:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: true
        }
      };

    case RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: false,
          recipe: action.response
        }
      };

    default:
      return state;
  }
}
