import initialState from '../../redux/initialState';
import {
  RECIPE_SAVE,
  RECIPE_SAVE_SUCCESS,
  RECIPE_SAVE_FAILURE,
} from './actions';

const recipeEditReducer = (state = initialState.recipeEdit, action) => {
  switch (action.type) {
    case RECIPE_SAVE:
      return {
        ...state,
        isSaving: true,
      };

    case RECIPE_SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
      };

    case RECIPE_SAVE_FAILURE:
      return {
        ...state,
        isSaving: false,
      };

    default:
      return state;
  }
};

export default recipeEditReducer;
