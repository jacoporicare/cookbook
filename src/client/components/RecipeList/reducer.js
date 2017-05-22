import initialState from '../../redux/initialState';
import {
  RECIPE_LIST_FETCH,
  RECIPE_LIST_FETCH_SUCCESS,
  RECIPE_LIST_FETCH_FAILURE,
} from './actions';

const sortByTitle = (a, b) => a.title.localeCompare(b.title);

const recipeListReducer = (state = initialState.recipeList, action) => {
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

    default:
      return state;
  }
};

export default recipeListReducer;

export const findRecipeBySlug = (state, slug) =>
  state.recipeList.recipes.find(r => r.slug === slug);
