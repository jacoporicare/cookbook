import initialState from '../../redux/initialState';
import {
  RECIPE_FETCH,
  RECIPE_FETCH_SUCCESS,
  RECIPE_FETCH_FAILURE,
} from './actions';

const recipeDetailReducer = (state = initialState.recipeDetail, action) => {
  switch (action.type) {
    case RECIPE_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case RECIPE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        recipesBySlug: {
          ...state.recipesBySlug,
          [action.slug]: action.response,
        },
      };

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
