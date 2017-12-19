import { RecipeDetail } from '../../types';
import { deleteNullKeys } from '../../utils';
import { RecipeDetailAction } from './actions';

export interface RecipeDetailState {
  isFetching: boolean;
  recipesBySlug: {
    [slug: string]: RecipeDetail;
  };
}

const initialState: RecipeDetailState = {
  isFetching: false,
  recipesBySlug: {},
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
          [slug]: deleteNullKeys(recipe),
        },
      };
    }

    case 'RECIPE.FETCH.FAILURE':
      return {
        ...state,
        isFetching: false,
      };
    // case RECIPE_SAVE_REQUEST:
    //   return {
    //     ...state,
    //     isSaving: true,
    //   };
    //
    // case RECIPE_SAVE_SUCCESS:
    //   return {
    //     ...state,
    //     isSaving: false,
    //     [action.response.slug]: {
    //       ...state[action.response.slug],
    //       recipe: action.response,
    //     },
    //   };
    //
    // case RECIPE_SAVE_FAILURE:
    //   return {
    //     ...state,
    //     isSaving: false,
    //   };

    default:
      return state;
  }
}

export default recipeDetailReducer;
