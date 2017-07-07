import expect from 'unexpected';
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
    const stateBefore = {};
    const action = saveRecipeRequest();
    const stateAfter = { isSaving: true };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('saves recipe', () => {
    const stateBefore = { isSaving: true };
    const action = saveRecipeSuccess();
    const stateAfter = { isSaving: false };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('starts fetching ingredient list', () => {
    const stateBefore = {};
    const action = fetchIngredientListRequest();
    const stateAfter = {
      ingredientList: {
        isFetching: true,
      },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('fetches ingredient list', () => {
    const stateBefore = {
      ingredientList: {
        isFetching: true,
        ingredients: [],
      },
    };
    const action = fetchIngredientListSuccess(['ing1', 'ing2']);
    const stateAfter = {
      ingredientList: {
        isFetching: false,
        ingredients: ['ing1', 'ing2'],
      },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('starts fetching side dish list', () => {
    const stateBefore = {};
    const action = fetchSideDishListRequest();
    const stateAfter = {
      sideDishList: {
        isFetching: true,
      },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('fetches side dish list', () => {
    const stateBefore = {
      sideDishList: {
        isFetching: true,
        sideDishes: [],
      },
    };
    const action = fetchSideDishListSuccess(['sd1', 'sd2']);
    const stateAfter = {
      sideDishList: {
        isFetching: false,
        sideDishes: ['sd1', 'sd2'],
      },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });
});
