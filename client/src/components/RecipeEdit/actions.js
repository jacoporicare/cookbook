import { CALL_API } from '../../middleware/api';

export const RECIPE_SAVE_REQUEST = 'RECIPE.SAVE.REQUEST';
export const RECIPE_SAVE_SUCCESS = 'RECIPE.SAVE.SUCCESS';
export const RECIPE_SAVE_FAILURE = 'RECIPE.SAVE.FAILURE';

export const INGREDIENT_LIST_FETCH_REQUEST = 'INGREDIENT_LIST.FETCH.REQUEST';
export const INGREDIENT_LIST_FETCH_SUCCESS = 'INGREDIENT_LIST.FETCH.SUCCESS';
export const INGREDIENT_LIST_FETCH_FAILURE = 'INGREDIENT_LIST.FETCH.FAILURE';

export const SIDE_DISH_LIST_FETCH_REQUEST = 'SIDE_DISH_LIST.FETCH.REQUEST';
export const SIDE_DISH_LIST_FETCH_SUCCESS = 'SIDE_DISH_LIST.FETCH.SUCCESS';
export const SIDE_DISH_LIST_FETCH_FAILURE = 'SIDE_DISH_LIST.FETCH.FAILURE';

export const saveRecipeRequest = () => ({
  type: RECIPE_SAVE_REQUEST,
});

export const saveRecipeSuccess = recipe => ({
  type: RECIPE_SAVE_SUCCESS,
  payload: {
    recipe,
  },
});

export const saveRecipeFailure = () => ({
  type: RECIPE_SAVE_FAILURE,
});

export const saveRecipe = recipe => ({
  [CALL_API]: {
    actions: [saveRecipeRequest, saveRecipeSuccess, saveRecipeFailure],
    url: recipe._id ? `/api/recipes/${recipe._id}` : '/api/recipes',
    method: 'post',
    data: recipe,
  },
});

export const fetchIngredientListRequest = () => ({
  type: INGREDIENT_LIST_FETCH_REQUEST,
});

export const fetchIngredientListSuccess = ingredients => ({
  type: INGREDIENT_LIST_FETCH_SUCCESS,
  payload: {
    ingredients,
  },
});

export const fetchIngredientListFailure = () => ({
  type: INGREDIENT_LIST_FETCH_FAILURE,
});

export const fetchIngredientList = () => ({
  [CALL_API]: {
    actions: [fetchIngredientListRequest, fetchIngredientListSuccess, fetchIngredientListFailure],
    url: '/api/recipes/ingredients',
  },
});

export const fetchSideDishListRequest = () => ({
  type: SIDE_DISH_LIST_FETCH_REQUEST,
});

export const fetchSideDishListSuccess = sideDishes => ({
  type: SIDE_DISH_LIST_FETCH_SUCCESS,
  payload: {
    sideDishes,
  },
});

export const fetchSideDishListFailure = () => ({
  type: SIDE_DISH_LIST_FETCH_FAILURE,
});

export const fetchSideDishList = () => ({
  [CALL_API]: {
    actions: [fetchSideDishListRequest, fetchSideDishListSuccess, fetchSideDishListFailure],
    url: '/api/recipes/side-dishes',
  },
});
