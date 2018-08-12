import { ThunkDispatch } from 'redux-thunk';
import { notify } from 'react-notify-toast';

import { RecipeDetail, Ingredient, StoreState } from '../../types';
import { undefinedToNull } from '../../utils';
import api, { handleError } from '../../api';

export type RecipeEditAction =
  | { type: 'RECIPE.SAVE.REQUEST' }
  | { type: 'RECIPE.SAVE.SUCCESS'; payload: { recipe: RecipeDetail } }
  | { type: 'RECIPE.SAVE.FAILURE' }
  | { type: 'INGREDIENT_LIST.FETCH.REQUEST' }
  | { type: 'INGREDIENT_LIST.FETCH.SUCCESS'; payload: { ingredients: string[] } }
  | { type: 'INGREDIENT_LIST.FETCH.FAILURE' }
  | { type: 'SIDE_DISH_LIST.FETCH.REQUEST' }
  | { type: 'SIDE_DISH_LIST.FETCH.SUCCESS'; payload: { sideDishes: string[] } }
  | { type: 'SIDE_DISH_LIST.FETCH.FAILURE' };

export const saveRecipeRequest = (): RecipeEditAction => ({
  type: 'RECIPE.SAVE.REQUEST',
});

export const saveRecipeSuccess = (recipe: RecipeDetail): RecipeEditAction => ({
  type: 'RECIPE.SAVE.SUCCESS',
  payload: {
    recipe,
  },
});

export const saveRecipeFailure = (): RecipeEditAction => ({
  type: 'RECIPE.SAVE.FAILURE',
});

export type SaveRecipeParams = {
  title: string;
  sideDish?: string;
  preparationTime?: number;
  directions?: string;
  servingCount?: number;
  ingredients: Ingredient[];
};

export function saveRecipe(id: string | undefined, recipe: SaveRecipeParams, hasNewImage: boolean) {
  return (
    dispatch: ThunkDispatch<StoreState, {}, RecipeEditAction>,
    getState: () => StoreState,
  ) => {
    dispatch(saveRecipeRequest());

    return api(getState)
      .post<RecipeDetail>(id ? `/api/recipes/${id}` : '/api/recipes', undefinedToNull(recipe))
      .then(({ data }) => {
        notify.show('Recept úspěšně uložen', 'success');
        return dispatch(saveRecipeSuccess(hasNewImage ? { ...data, hasImage: true } : data));
      })
      .catch(error => {
        handleError(error);
        return dispatch(saveRecipeFailure());
      });
  };
}

export const fetchIngredientListRequest = (): RecipeEditAction => ({
  type: 'INGREDIENT_LIST.FETCH.REQUEST',
});

export const fetchIngredientListSuccess = (ingredients: string[]): RecipeEditAction => ({
  type: 'INGREDIENT_LIST.FETCH.SUCCESS',
  payload: {
    ingredients,
  },
});

export const fetchIngredientListFailure = (): RecipeEditAction => ({
  type: 'INGREDIENT_LIST.FETCH.FAILURE',
});

export function fetchIngredientList() {
  return (
    dispatch: ThunkDispatch<StoreState, {}, RecipeEditAction>,
    getState: () => StoreState,
  ) => {
    dispatch(fetchIngredientListRequest());

    return api(getState)
      .get<string[]>('/api/recipes/ingredients')
      .then(({ data }) => dispatch(fetchIngredientListSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchIngredientListFailure());
      });
  };
}

export const fetchSideDishListRequest = (): RecipeEditAction => ({
  type: 'SIDE_DISH_LIST.FETCH.REQUEST',
});

export const fetchSideDishListSuccess = (sideDishes: string[]): RecipeEditAction => ({
  type: 'SIDE_DISH_LIST.FETCH.SUCCESS',
  payload: {
    sideDishes,
  },
});

export const fetchSideDishListFailure = (): RecipeEditAction => ({
  type: 'SIDE_DISH_LIST.FETCH.FAILURE',
});

export function fetchSideDishList() {
  return (
    dispatch: ThunkDispatch<StoreState, {}, RecipeEditAction>,
    getState: () => StoreState,
  ) => {
    dispatch(fetchSideDishListRequest());

    return api(getState)
      .get<string[]>('/api/recipes/side-dishes')
      .then(({ data }) => dispatch(fetchSideDishListSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchSideDishListFailure());
      });
  };
}
