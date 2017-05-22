import expect from 'unexpected';
import reducer from '../reducer';
import { recipeSave, recipeSaveSuccess } from '../actions';

describe('RecipeEdit reducer', () => {
  it('starts saving recipe', () => {
    const stateBefore = undefined;
    const action = recipeSave();
    const stateAfter = { isSaving: true };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('saves recipe', () => {
    const stateBefore = { isSaving: true };
    const action = recipeSaveSuccess();
    const stateAfter = { isSaving: false };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });
});
