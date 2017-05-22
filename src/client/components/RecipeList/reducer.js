import initialState from '../../redux/initialState';
import {
  RECIPE_LIST_FETCH,
  RECIPE_LIST_FETCH_SUCCESS,
  RECIPE_LIST_FETCH_FAILURE,
} from './actions';
import { RECIPE_DELETE_SUCCESS } from '../RecipeDetail/actions';

const sortByTitle = (a, b) => a.title.localeCompare(b.title);

const recipeListReducer = (state = initialState.recipeList, action) => {
  switch (action.type) {
    case RECIPE_LIST_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case RECIPE_LIST_FETCH_SUCCESS: {
      const { recipes } = action.payload;

      return {
        ...state,
        isFetching: false,
        recipes: recipes.sort(sortByTitle),
      };
    }

    case RECIPE_LIST_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case RECIPE_DELETE_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        recipes: state.recipes.filter(r => r._id !== id),
      };
    }

    default:
      return state;
  }
};

export default recipeListReducer;

export const findRecipeBySlug = (state, slug) =>
  state.recipeList.recipes.find(r => r.slug === slug);
