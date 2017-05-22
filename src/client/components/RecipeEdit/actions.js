import { CALL_API } from '../../middleware/api2';

export const RECIPE_SAVE = 'RECIPE.SAVE';
export const RECIPE_SAVE_SUCCESS = 'RECIPE.SAVE.SUCCESS';
export const RECIPE_SAVE_FAILURE = 'RECIPE.SAVE.FAILURE';

export const recipeSave = () => ({
  type: RECIPE_SAVE,
});

export const recipeSaveSuccess = recipe => ({
  type: RECIPE_SAVE_SUCCESS,
  payload: {
    recipe,
  },
});

export const recipeSaveFailure = () => ({
  type: RECIPE_SAVE_FAILURE,
});

export const saveRecipe = recipe => ({
  [CALL_API]: {
    actions: [recipeSave, recipeSaveSuccess, recipeSaveFailure],
    url: recipe._id ? `/api/recipes/${recipe._id}` : '/api/recipes',
    method: 'post',
    data: recipe,
  },
});
