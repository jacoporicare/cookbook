import initialState from './initialState';
import {
  RECIPE_DETAIL_REQUEST,
  RECIPE_DETAIL_SUCCESS,
  RECIPE_DETAIL_FAILURE,
  RECIPE_SAVE_REQUEST,
  RECIPE_SAVE_SUCCESS,
  RECIPE_SAVE_FAILURE,
} from '../actions/recipeDetailsActions';

export default function recipeDetailsReducer(state = initialState.recipeDetails, action) {
  switch (action.type) {
    case RECIPE_DETAIL_REQUEST:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: true,
        },
      };

    case RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: false,
          recipe: action.response,
        },
      };

    case RECIPE_DETAIL_FAILURE:
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isFetching: false,
        },
      };

    case RECIPE_SAVE_REQUEST:
      return {
        ...state,
        isSaving: true,
      };

    case RECIPE_SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        [action.response.slug]: {
          ...state[action.response.slug],
          recipe: action.response,
        },
      };

    case RECIPE_SAVE_FAILURE:
      return {
        ...state,
        isSaving: false,
      };

    default:
      return state;
  }
}
