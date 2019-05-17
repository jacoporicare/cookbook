import { ThunkDispatch } from 'redux-thunk';

import { RecipeDetail, StoreState } from '../../types';
import api, { handleError } from '../../api';

export type RecipeDetailAction =
  | { type: 'RECIPE.FETCH.REQUEST' }
  | { type: 'RECIPE.FETCH.SUCCESS'; payload: { recipe: RecipeDetail; slug: string } }
  | { type: 'RECIPE.FETCH.FAILURE' }
  | { type: 'RECIPE.FETCH_ALL.BEGIN' }
  | { type: 'RECIPE.FETCH_ALL.END'; payload: { recipesBySlug: Record<string, RecipeDetail> } };

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
  return (
    dispatch: ThunkDispatch<StoreState, {}, RecipeDetailAction>,
    getState: () => StoreState,
  ) => {
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

export const fetchAllRecipesBegin = (): RecipeDetailAction => ({
  type: 'RECIPE.FETCH_ALL.BEGIN',
});

export const fetchAllRecipesEnd = (
  recipesBySlug: Record<string, RecipeDetail>,
): RecipeDetailAction => ({
  type: 'RECIPE.FETCH_ALL.END',
  payload: { recipesBySlug },
});

export function fetchAllRecipes(slugs: string[]) {
  return (
    dispatch: ThunkDispatch<StoreState, {}, RecipeDetailAction>,
    getState: () => StoreState,
  ) => {
    dispatch(fetchAllRecipesBegin());

    const promises = slugs.map(slug =>
      api(getState)
        .get<RecipeDetail>(`/api/recipes/${slug}`)
        .then(({ data }) => ({ slug, data }))
        .catch(error => {
          handleError(error);
          return undefined;
        }),
    );

    Promise.all(promises).then(recipes =>
      dispatch(
        fetchAllRecipesEnd(
          recipes.reduce<Record<string, RecipeDetail>>(
            (acc, cur) => (!cur ? acc : { ...acc, [cur.slug]: cur.data }),
            {},
          ),
        ),
      ),
    );
  };
}
