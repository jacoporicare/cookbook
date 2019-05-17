import reducer from '../reducer';
import {
  saveRecipeRequest,
  saveRecipeSuccess,
  fetchIngredientListRequest,
  fetchIngredientListSuccess,
  fetchSideDishListRequest,
  fetchSideDishListSuccess,
} from '../actions';

describe('RecipeEdit reducer', () => {
  it('starts saving recipe', () => {
    const stateBefore = undefined;
    const action = saveRecipeRequest();
    const stateAfter = {
      ingredientList: { ingredients: [], isFetching: false },
      isSaving: true,
      sideDishList: { isFetching: false, sideDishes: [] },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('saves recipe', () => {
    const stateBefore = {
      isSaving: true,
      ingredientList: { ingredients: [], isFetching: false },
      sideDishList: { isFetching: false, sideDishes: [] },
    };
    const action = saveRecipeSuccess({
      _id: 'a',
      slug: 'recept',
      title: 'Recept',
      ingredients: [],
      lastModifiedDate: '2017-12-23T00:02:39.994Z',
      userId: 1,
      userName: 'Kubík',
    });
    const stateAfter = {
      isSaving: false,
      ingredientList: { ingredients: [], isFetching: false },
      sideDishList: { isFetching: false, sideDishes: [] },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('starts fetching ingredient list', () => {
    const stateBefore = undefined;
    const action = fetchIngredientListRequest();
    const stateAfter = {
      isSaving: false,
      ingredientList: { ingredients: [], isFetching: true },
      sideDishList: { isFetching: false, sideDishes: [] },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('fetches ingredient list', () => {
    const stateBefore = {
      isSaving: false,
      ingredientList: { ingredients: [], isFetching: true },
      sideDishList: { isFetching: false, sideDishes: [] },
    };
    const action = fetchIngredientListSuccess(['ing1', 'ing2']);
    const stateAfter = {
      ingredientList: { ingredients: ['ing1', 'ing2'], isFetching: false },
      isSaving: false,
      sideDishList: { isFetching: false, sideDishes: [] },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('starts fetching side dish list', () => {
    const stateBefore = undefined;
    const action = fetchSideDishListRequest();
    const stateAfter = {
      ingredientList: { ingredients: [], isFetching: false },
      isSaving: false,
      sideDishList: { isFetching: true, sideDishes: [] },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('fetches side dish list', () => {
    const stateBefore = {
      ingredientList: { ingredients: [], isFetching: false },
      isSaving: false,
      sideDishList: { isFetching: true, sideDishes: [] },
    };
    const action = fetchSideDishListSuccess(['sd1', 'sd2']);
    const stateAfter = {
      ingredientList: { ingredients: [], isFetching: false },
      isSaving: false,
      sideDishList: { isFetching: false, sideDishes: ['sd1', 'sd2'] },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
