import initialState from './initialState';
import {
  RECIPES_REQUEST,
  RECIPES_SUCCESS,
  RECIPES_FAILURE
} from '../actions/recipesActions';
import {
  RECIPE_SAVE_SUCCESS,
  RECIPE_DELETE_REQUEST
} from '../actions/recipeDetailsActions';

const sortByTitle = (a, b) => a.title.localeCompare(b.title);

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
        items: action.response.sort(sortByTitle)
      };

    case RECIPES_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    case RECIPE_SAVE_SUCCESS: {
      return {
        ...state,
        items: [
          ...state.items.filter(r => r._id !== action.response._id),
          action.response
        ].sort(sortByTitle)
      };
    }

    case RECIPE_DELETE_REQUEST:
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
