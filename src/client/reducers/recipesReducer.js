import initialState from './initialState';
import {
  RECIPES_REQUEST,
  RECIPES_SUCCESS,
  RECIPES_FAILURE
} from '../actions/recipesActions';
import { RECIPE_DELETE_SUCCESS } from '../actions/recipeDetailsActions';

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

    case RECIPE_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(r => r._id !== action.id)
      };

    default:
      return state;
  }
}

export function findRecipeBySlug(state, slug) {
  return state.recipes.items.find(r => r.slug === slug);
}
