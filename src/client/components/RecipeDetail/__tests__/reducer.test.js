import expect from 'unexpected';
import { recipeFetch, recipeFetchSuccess } from '../actions';
import reducer from '../reducer';

describe('RecipeDetail reducer', () => {
  it('starts fetching recipe', () => {
    const action = recipeFetch();
    const stateAfter = { isFetching: true, recipesBySlug: {} };
    expect(reducer(undefined, action), 'to equal', stateAfter);
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
