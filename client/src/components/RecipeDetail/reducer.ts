import { RecipeDetail } from '../../types';
import { RecipeListAction } from '../RecipeList/actions';
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
  action: RecipeDetailAction | RecipeListAction,
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

    case 'RECIPE.FETCH_ALL.END':
      return {
        ...state,
        isFetchingAllRecipes: false,
        recipesBySlug: {
          ...state.recipesBySlug,
          ...action.payload.recipesBySlug,
        },
      };

    case 'RECIPE_LIST.FETCH.SUCCESS':
      return {
        ...state,
        recipesBySlug: Object.entries(state.recipesBySlug).reduce<Record<string, RecipeDetail>>(
          (acc, [slug, recipe]) => {
            if (action.payload.recipes.some(r => r.slug === slug)) {
              acc[slug] = recipe;
            }

            return acc;
          },
          {},
        ),
      };

    default:
      return state;
  }
}

export default recipeDetailReducer;
