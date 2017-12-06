import { CALL_API } from '../../middleware/api';

export const RECIPE_DELETE_REQUEST = 'RECIPE.DELETE.REQUEST';
export const RECIPE_DELETE_SUCCESS = 'RECIPE.DELETE.SUCCESS';
export const RECIPE_DELETE_FAILURE = 'RECIPE.DELETE.FAILURE';

export const deleteRecipeRequest = () => ({
  type: RECIPE_DELETE_REQUEST,
});

export const deleteRecipeSuccess = id => ({
  type: RECIPE_DELETE_SUCCESS,
  payload: {
    id,
  },
});

export const deleteRecipeFailure = () => ({
  type: RECIPE_DELETE_FAILURE,
});

export const deleteRecipe = id => ({
  [CALL_API]: {
    actions: [deleteRecipeRequest, () => deleteRecipeSuccess(id), deleteRecipeFailure],
    url: `/api/recipes/${id}`,
    method: 'delete',
  },
});
