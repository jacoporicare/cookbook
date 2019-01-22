import { RecipeDetail } from '../../types';
import { RecipeDetailAction } from './actions';

export type RecipeDetailState = {
  isFetching: boolean;
  recipesBySlug: Record<string, RecipeDetail>;
  isFetchingAllRecipes: boolean;
};

const initialState: RecipeDetailState = {
  isFetching: false,
  recipesBySlug: {},
  isFetchingAllRecipes: false,
};

function recipeDetailReducer(
  state: RecipeDetailState = initialState,
  action: RecipeDetailAction,
): RecipeDetailState {
  switch (action.type) {
    case 'RECIPE.FETCH.REQUEST':
      return {
        ...state,
        isFetching: true,
      };

    case 'RECIPE.FETCH.SUCCESS': {
      const { recipe, slug } = action.payload;

      return {
        ...state,
        isFetching: false,
        recipesBySlug: {
          ...state.recipesBySlug,
          [slug]: recipe,
        },
      };
    }

    case 'RECIPE.FETCH.FAILURE':
      return {
        ...state,
        isFetching: false,
      };

    case 'RECIPE.FETCH_ALL.BEGIN':
      return {
        ...state,
        isFetchingAllRecipes: true,
      };

    case 'RECIPE.FETCH_ALL.END': {
      return {
        ...state,
        isFetchingAllRecipes: false,
        recipesBySlug: {
          ...state.recipesBySlug,
          ...action.payload.recipesBySlug,
        },
      };
    }

    default:
      return state;
  }
}

export default recipeDetailReducer;
