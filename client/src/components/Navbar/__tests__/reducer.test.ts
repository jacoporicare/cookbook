import reducer from '../reducer';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../actions';

describe('Navbar reducer', () => {
  it('starts fetching user', () => {
    const stateBefore = undefined;
    const action = fetchUserRequest();
    const stateAfter = { isFetchingUser: true, error: false };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('fetches user', () => {
    const stateBefore = { isFetchingUser: true, error: false };
    const action = fetchUserSuccess({ id: 1, username: 'johndoe', name: 'John Doe' });
    const stateAfter = {
      isFetchingUser: false,
      error: false,
      user: { id: 1, username: 'johndoe', name: 'John Doe' },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('fails to fetch user', () => {
    const stateBefore = { isFetchingUser: true, error: false };
    const action = fetchUserFailure();
    const stateAfter = { isFetchingUser: false, error: true };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
