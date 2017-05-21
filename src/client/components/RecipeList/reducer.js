import initialState from '../../redux/initialState';
import {
  RECIPE_LIST_FETCH,
  RECIPE_LIST_FETCH_SUCCESS,
  RECIPE_LIST_FETCH_FAILURE,
} from './actions';
import {
  RECIPE_SAVE_SUCCESS,
  RECIPE_DELETE_REQUEST,
} from '../../actions/recipeDetailsActions';

const sortByTitle = (a, b) => a.title.localeCompare(b.title);

export default function recipesReducer(state = initialState.recipeList, action) {
  switch (action.type) {
    case RECIPE_LIST_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case RECIPE_LIST_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        recipes: action.response.sort(sortByTitle),
      };

    case RECIPE_LIST_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case RECIPE_SAVE_SUCCESS: {
      return {
        ...state,
        recipes: [
          ...state.recipes.filter(r => r._id !== action.response._id),
          action.response,
        ].sort(sortByTitle),
      };
    }

    case RECIPE_DELETE_REQUEST:
      return {
        ...state,
        recipes: state.recipes.filter(r => r._id !== action.id),
      };

    default:
      return state;
  }
}

export function findRecipeBySlug(state, slug) {
  return state.recipeList.recipes.find(r => r.slug === slug);
}
