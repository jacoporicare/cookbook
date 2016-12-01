import initialState from './initialState';
import {
  RECIPES_REQUEST,
  RECIPES_SUCCESS,
  RECIPES_FAILURE
} from '../actions/recipesActions';

export default function recipesReducer(state = initialState.recipes, action) {
  switch (action.type) {
    case RECIPES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case RECIPES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.response
      };

    case RECIPES_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
}

export function findRecipeBySlug(state, slug) {
  return state.recipes.items.find(r => r.slug === slug);
}
