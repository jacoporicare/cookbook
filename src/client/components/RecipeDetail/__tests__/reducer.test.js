import expect from 'unexpected';
import reducer from '../reducer';
import { fetchRecipeRequest, fetchRecipeSuccess } from '../actions';

describe('RecipeDetail reducer', () => {
  it('starts fetching recipe', () => {
    const stateBefore = {};
    const action = fetchRecipeRequest();
    const stateAfter = { isFetching: true };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('fetches recipe', () => {
    const stateBefore = { isFetching: true, recipesBySlug: {} };
    const action = fetchRecipeSuccess({ title: 'Recept' }, 'recept');
    const stateAfter = {
      isFetching: false,
      recipesBySlug: {
        recept: { title: 'Recept' },
      },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });
});
