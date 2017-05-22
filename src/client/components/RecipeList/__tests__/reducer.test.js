import expect from 'unexpected';
import reducer from '../reducer';
import { recipeListFetch, recipeListFetchSuccess } from '../actions';
import { recipeSaveSuccess } from '../../RecipeEdit/actions';
import { recipeDeleteSuccess } from '../../RecipeDetail/actions';

describe('RecipeList reducer', () => {
  it('starts fetching recipe list', () => {
    const stateBefore = undefined;
    const action = recipeListFetch();
    const stateAfter = { isFetching: true, recipes: [] };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
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

  it('adds recipe to the list and re-sort', () => {
    const stateBefore = {
      recipes: [{ _id: 2, title: 'a' }, { _id: 1, title: 'z' }],
    };
    const action = recipeSaveSuccess({ _id: 3, title: 'm' });
    const stateAfter = {
      recipes: [
        { _id: 2, title: 'a' },
        { _id: 3, title: 'm' },
        { _id: 1, title: 'z' },
      ],
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('updates recipe in the list and re-sort', () => {
    const stateBefore = {
      recipes: [
        { _id: 2, title: 'a' },
        { _id: 3, title: 'm' },
        { _id: 1, title: 'n' },
      ],
    };
    const action = recipeSaveSuccess({ _id: 3, title: 'o' });
    const stateAfter = {
      recipes: [
        { _id: 2, title: 'a' },
        { _id: 1, title: 'n' },
        { _id: 3, title: 'o' },
      ],
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
