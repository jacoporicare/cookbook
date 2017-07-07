import expect from 'unexpected';
import reducer from '../reducer';
import { fetchUserRequest, fetchUserSuccess } from '../actions';

describe('Navbar reducer', () => {
  it('starts fetching user', () => {
    const stateBefore = {};
    const action = fetchUserRequest();
    const stateAfter = { isFetchingUser: true };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });

  it('fetches user', () => {
    const stateBefore = { isFetchingUser: true };
    const action = fetchUserSuccess({ id: 1, username: 'John Doe' });
    const stateAfter = {
      isFetchingUser: false,
      user: { id: 1, username: 'John Doe' },
    };

    expect(reducer(stateBefore, action), 'to equal', stateAfter);
  });
});
