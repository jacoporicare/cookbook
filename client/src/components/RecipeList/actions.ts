import { Dispatch } from 'redux';

import { Recipe, StoreState } from '../../types';
import api, { handleError } from '../../api';

export type RecipeListAction =
  | { type: 'RECIPE_LIST.FETCH.REQUEST' }
  | { type: 'RECIPE_LIST.FETCH.SUCCESS'; payload: { recipes: Recipe[] } }
  | { type: 'RECIPE_LIST.FETCH.FAILURE' };

export const fetchRecipeListRequest = (): RecipeListAction => ({
  type: 'RECIPE_LIST.FETCH.REQUEST',
});

export const fetchRecipeListSuccess = (recipes: Recipe[]): RecipeListAction => ({
  type: 'RECIPE_LIST.FETCH.SUCCESS',
  payload: {
    recipes,
  },
});

export const fetchRecipeListFailure = (): RecipeListAction => ({
  type: 'RECIPE_LIST.FETCH.FAILURE',
});

export function fetchRecipeList() {
  return (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
    dispatch(fetchRecipeListRequest());

    return api(getState)
      .get<Recipe[]>('/api/recipes/')
      .then(({ data }) => dispatch(fetchRecipeListSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchRecipeListFailure());
      });
  };
}
