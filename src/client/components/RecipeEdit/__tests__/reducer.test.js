import expect from 'unexpected';
import reducer from '../reducer';
import { saveRecipeRequest, saveRecipeSuccess } from '../actions';

describe('RecipeEdit reducer', () => {
  it('starts saving recipe', () => {
    const stateBefore = undefined;
    const action = saveRecipeRequest();
    const stateAfter = { isSaving: true };

    expect(
      reducer(stateBefore, action).isSaving,
      'to equal',
      stateAfter.isSaving,
    );
  });

  it('saves recipe', () => {
    const stateBefore = { isSaving: true };
    const action = saveRecipeSuccess();
    const stateAfter = { isSaving: false };

    expect(
      reducer(stateBefore, action).isSaving,
      'to equal',
      stateAfter.isSaving,
    );
  });
});
