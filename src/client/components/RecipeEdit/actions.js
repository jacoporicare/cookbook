import { CALL_API } from '../../middleware/api';

export const RECIPE_SAVE = 'RECIPE.SAVE';
export const RECIPE_SAVE_SUCCESS = 'RECIPE.SAVE.SUCCESS';
export const RECIPE_SAVE_FAILURE = 'RECIPE.SAVE.FAILURE';

export const saveRecipe = recipe => ({
  [CALL_API]: {
    types: [RECIPE_SAVE, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAILURE],
    url: recipe._id ? `/api/recipes/${recipe._id}` : '/api/recipes',
    method: 'post',
    data: recipe,
  },
});
