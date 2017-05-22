import expect from 'unexpected';
import reducer from '../reducer';
import { recipeFetch, recipeFetchSuccess } from '../actions';

describe('RecipeDetail reducer', () => {
  it('starts fetching recipe', () => {
    const stateBefore = undefined;
    const action = recipeFetch();
    const stateAfter = { isFetching: true, recipesBySlug: {} };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('fetches recipe', () => {
    const stateBefore = { isFetching: true, recipesBySlug: {} };
    const action = recipeFetchSuccess({ title: 'Recept' }, 'recept');
    const stateAfter = {
      isFetching: false,
      recipesBySlug: {
        recept: { title: 'Recept' },
      },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });
});
