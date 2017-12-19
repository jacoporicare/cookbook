import { Dispatch } from 'redux';

import { RecipeDetail, StoreState } from '../../types';
import api, { handleError } from '../../api';

export type RecipeDetailAction =
  | { type: 'RECIPE.FETCH.REQUEST' }
  | { type: 'RECIPE.FETCH.SUCCESS'; payload: { recipe: RecipeDetail; slug: string } }
  | { type: 'RECIPE.FETCH.FAILURE' };

export const fetchRecipeRequest = (): RecipeDetailAction => ({
  type: 'RECIPE.FETCH.REQUEST',
});

export const fetchRecipeSuccess = (recipe: RecipeDetail, slug: string): RecipeDetailAction => ({
  type: 'RECIPE.FETCH.SUCCESS',
  payload: {
    recipe,
    slug,
  },
});

export const fetchRecipeFailure = (): RecipeDetailAction => ({
  type: 'RECIPE.FETCH.FAILURE',
});

export function fetchRecipe(slug: string) {
  return (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
    dispatch(fetchRecipeRequest());

    return api(getState)
      .get<RecipeDetail>(`/api/recipes/${slug}`)
      .then(({ data }) => dispatch(fetchRecipeSuccess(data, slug)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchRecipeFailure());
      });
  };
}
