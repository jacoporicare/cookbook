import expect from 'unexpected';
import { recipeListFetch, recipeListFetchSuccess } from '../actions';
import { recipeDeleteSuccess } from '../../RecipeDetail/actions';
import reducer from '../reducer';

describe('RecipeList reducer', () => {
  it('starts fetching recipe list', () => {
    const action = recipeListFetch();
    const stateAfter = { isFetching: true, recipes: [] };
    expect(reducer(undefined, action), 'to equal', stateAfter);
  });

  it('fetches recipe list and sort them by title', () => {
    const stateBefore = { isFetching: true, recipes: [] };
    const action = recipeListFetchSuccess([
      { _id: 1, title: 'z' },
      { _id: 2, title: 'a' },
    ]);
    const stateAfter = {
      isFetching: false,
      recipes: [{ _id: 2, title: 'a' }, { _id: 1, title: 'z' }],
    };
    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('deletes recipe from the list', () => {
    const stateBefore = {
      recipes: [{ _id: 1, title: 'z' }, { _id: 2, title: 'a' }],
    };
    const action = recipeDeleteSuccess(1);
    const stateAfter = {
      recipes: [{ _id: 2, title: 'a' }],
    };
    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });
});
