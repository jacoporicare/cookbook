import reducer from '../reducer';
import { fetchRecipeListRequest, fetchRecipeListSuccess } from '../actions';
import { saveRecipeSuccess } from '../../RecipeEdit/actions';
import { deleteRecipeSuccess } from '../../RecipeDeleteModal/actions';

describe('RecipeList reducer', () => {
  it('starts fetching recipe list', () => {
    const stateBefore = undefined;
    const action = fetchRecipeListRequest();
    const stateAfter = { isFetching: true, recipes: [] };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('fetches recipe list and sort them by title', () => {
    const stateBefore = { isFetching: true, recipes: [] };
    const action = fetchRecipeListSuccess([
      { _id: '1', slug: 'z', title: 'z' },
      { _id: '2', slug: 'a', title: 'a' },
    ]);
    const stateAfter = {
      isFetching: false,
      recipes: [{ _id: '2', slug: 'a', title: 'a' }, { _id: '1', slug: 'z', title: 'z' }],
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('adds recipe to the list and re-sort', () => {
    const stateBefore = {
      isFetching: false,
      recipes: [{ _id: '2', slug: 'a', title: 'a' }, { _id: '1', slug: 'z', title: 'z' }],
    };
    const action = saveRecipeSuccess({
      _id: '3',
      slug: 'm',
      title: 'm',
      ingredients: [],
      lastModifiedDate: '2017-12-23T00:02:39.994Z',
      user: 'Kubik',
    });
    const stateAfter = {
      isFetching: false,
      recipes: [
        { _id: '2', slug: 'a', title: 'a' },
        {
          _id: '3',
          ingredients: [],
          lastModifiedDate: '2017-12-23T00:02:39.994Z',
          slug: 'm',
          title: 'm',
          user: 'Kubik',
        },
        { _id: '1', slug: 'z', title: 'z' },
      ],
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('updates recipe in the list and re-sort', () => {
    const stateBefore = {
      isFetching: false,
      recipes: [
        { _id: '2', slug: 'a', title: 'a' },
        { _id: '3', slug: 'm', title: 'm' },
        { _id: '1', slug: 'z', title: 'z' },
      ],
    };
    const action = saveRecipeSuccess({
      _id: '3',
      ingredients: [],
      lastModifiedDate: '2017-12-23T00:02:39.994Z',
      slug: 'o',
      title: 'o',
      user: 'Kubik',
    });
    const stateAfter = {
      isFetching: false,
      recipes: [
        { _id: '2', slug: 'a', title: 'a' },
        {
          _id: '3',
          ingredients: [],
          lastModifiedDate: '2017-12-23T00:02:39.994Z',
          slug: 'o',
          title: 'o',
          user: 'Kubik',
        },
        { _id: '1', slug: 'z', title: 'z' },
      ],
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('deletes recipe from the list', () => {
    const stateBefore = {
      isFetching: false,
      recipes: [{ _id: '2', slug: 'a', title: 'a' }, { _id: '1', slug: 'z', title: 'z' }],
    };
    const action = deleteRecipeSuccess('2');
    const stateAfter = {
      isFetching: false,
      recipes: [{ _id: '1', slug: 'z', title: 'z' }],
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
