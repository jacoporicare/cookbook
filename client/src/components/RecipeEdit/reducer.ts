import { RecipeEditAction } from './actions';

export interface RecipeEditState {
  isSaving: boolean;
  ingredientList: {
    isFetching: boolean;
    ingredients: string[];
  };
  sideDishList: {
    isFetching: boolean;
    sideDishes: string[];
  };
}

const initialState: RecipeEditState = {
  isSaving: false,
  ingredientList: {
    isFetching: false,
    ingredients: [],
  },
  sideDishList: {
    isFetching: false,
    sideDishes: [],
  },
};

function recipeEditReducer(
  state: RecipeEditState = initialState,
  action: RecipeEditAction,
): RecipeEditState {
  switch (action.type) {
    case 'RECIPE.SAVE.REQUEST':
      return {
        ...state,
        isSaving: true,
      };

    case 'RECIPE.SAVE.SUCCESS':
      return {
        ...state,
        isSaving: false,
      };

    case 'RECIPE.SAVE.FAILURE':
      return {
        ...state,
        isSaving: false,
      };

    case 'INGREDIENT_LIST.FETCH.REQUEST':
      return {
        ...state,
        ingredientList: {
          ...state.ingredientList,
          isFetching: true,
        },
      };

    case 'INGREDIENT_LIST.FETCH.SUCCESS': {
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

    case 'INGREDIENT_LIST.FETCH.FAILURE':
      return {
        ...state,
        ingredientList: {
          ...state.ingredientList,
          isFetching: false,
        },
      };

    case 'SIDE_DISH_LIST.FETCH.REQUEST':
      return {
        ...state,
        sideDishList: {
          ...state.sideDishList,
          isFetching: true,
        },
      };

    case 'SIDE_DISH_LIST.FETCH.SUCCESS': {
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

    case 'SIDE_DISH_LIST.FETCH.FAILURE':
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
}

export default recipeEditReducer;
