import initialState from '../../redux/initialState';
import {
  RECIPE_SAVE_REQUEST,
  RECIPE_SAVE_SUCCESS,
  RECIPE_SAVE_FAILURE,
  INGREDIENT_LIST_FETCH_REQUEST,
  INGREDIENT_LIST_FETCH_SUCCESS,
  INGREDIENT_LIST_FETCH_FAILURE,
  SIDE_DISH_LIST_FETCH_REQUEST,
  SIDE_DISH_LIST_FETCH_SUCCESS,
  SIDE_DISH_LIST_FETCH_FAILURE,
} from './actions';

const recipeEditReducer = (state = initialState.recipeEdit, action) => {
  switch (action.type) {
    case RECIPE_SAVE_REQUEST:
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

    case INGREDIENT_LIST_FETCH_REQUEST:
      return {
        ...state,
        ingredientList: {
          ...state.ingredientList,
          isFetching: true,
        },
      };

    case INGREDIENT_LIST_FETCH_SUCCESS: {
      const { ingredients } = action.payload;

      return {
        ...state,
        ingredientList: {
          ...state.ingredientList,
          isFetching: false,
          ingredients,
        },
      };
    }

    case INGREDIENT_LIST_FETCH_FAILURE:
      return {
        ...state,
        ingredientList: {
          ...state.ingredientList,
          isFetching: false,
        },
      };

    case SIDE_DISH_LIST_FETCH_REQUEST:
      return {
        ...state,
        sideDishList: {
          ...state.sideDishList,
          isFetching: true,
        },
      };

    case SIDE_DISH_LIST_FETCH_SUCCESS: {
      const { sideDishes } = action.payload;

      return {
        ...state,
        sideDishList: {
          ...state.sideDishList,
          isFetching: false,
          sideDishes,
        },
      };
    }

    case SIDE_DISH_LIST_FETCH_FAILURE:
      return {
        ...state,
        sideDishList: {
          ...state.sideDishList,
          isFetching: false,
        },
      };

    default:
      return state;
  }
};

export default recipeEditReducer;
