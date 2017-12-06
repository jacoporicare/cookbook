import initialState from '../../redux/initialState';
import { RECIPE_FETCH_REQUEST, RECIPE_FETCH_SUCCESS, RECIPE_FETCH_FAILURE } from './actions';

const recipeDetailReducer = (state = initialState.recipeDetail, action) => {
  switch (action.type) {
    case RECIPE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case RECIPE_FETCH_SUCCESS: {
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

    case RECIPE_FETCH_FAILURE:
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
};

export default recipeDetailReducer;
