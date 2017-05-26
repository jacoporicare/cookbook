import { CALL_API } from '../../middleware/api2';

export const RECIPE_SAVE_REQUEST = 'RECIPE.SAVE.REQUEST';
export const RECIPE_SAVE_SUCCESS = 'RECIPE.SAVE.SUCCESS';
export const RECIPE_SAVE_FAILURE = 'RECIPE.SAVE.FAILURE';

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
