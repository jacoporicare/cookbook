import { Dispatch } from 'redux';

import { StoreState } from '../../types';
import api, { handleError } from '../../api';

export type RecipeDeleteAction =
  | { type: 'RECIPE.DELETE.REQUEST' }
  | { type: 'RECIPE.DELETE.SUCCESS'; payload: { id: string } }
  | { type: 'RECIPE.DELETE.FAILURE' };

export const deleteRecipeRequest = (): RecipeDeleteAction => ({
  type: 'RECIPE.DELETE.REQUEST',
});

export const deleteRecipeSuccess = (id: string): RecipeDeleteAction => ({
  type: 'RECIPE.DELETE.SUCCESS',
  payload: {
    id,
  },
});

export const deleteRecipeFailure = (): RecipeDeleteAction => ({
  type: 'RECIPE.DELETE.FAILURE',
});

export function deleteRecipe(id: string) {
  return (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
    dispatch(deleteRecipeRequest());

    return api(getState)
      .delete(`/api/recipes/${id}`)
      .then(() => dispatch(deleteRecipeSuccess(id)))
      .catch(error => {
        handleError(error);
        return dispatch(deleteRecipeFailure());
      });
  };
}
