import reducer from '../reducer';
import { fetchRecipeRequest, fetchRecipeSuccess } from '../actions';

describe('RecipeDetail reducer', () => {
  it('starts fetching recipe', () => {
    const stateBefore = undefined;
    const action = fetchRecipeRequest();
    const stateAfter = { isFetching: true, recipesBySlug: {} };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('fetches recipe', () => {
    const stateBefore = { isFetching: true, recipesBySlug: {} };
    const action = fetchRecipeSuccess(
      {
        _id: '1',
        slug: 'recept',
        title: 'Recept',
        ingredients: [],
        lastModifiedDate: '2017-12-23T00:02:39.994Z',
        userId: 1,
        userName: 'Kubík',
      },
      'recept',
    );
    const stateAfter = {
      isFetching: false,
      recipesBySlug: {
        recept: {
          _id: '1',
          ingredients: [],
          lastModifiedDate: '2017-12-23T00:02:39.994Z',
          slug: 'recept',
          title: 'Recept',
          userId: 1,
          userName: 'Kubík',
        },
      },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
