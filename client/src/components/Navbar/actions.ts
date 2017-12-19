import { Dispatch } from 'redux';

import { User, StoreState } from '../../types';
import api, { handleError } from '../../api';

export type NavbarAction =
  | { type: 'NAVBAR.USER.FETCH.REQUEST' }
  | { type: 'NAVBAR.USER.FETCH.SUCCESS'; payload: { user: User } }
  | { type: 'NAVBAR.USER.FETCH.FAILURE' };

export const fetchUserRequest = (): NavbarAction => ({
  type: 'NAVBAR.USER.FETCH.REQUEST',
});

export const fetchUserSuccess = (user: User): NavbarAction => ({
  type: 'NAVBAR.USER.FETCH.SUCCESS',
  payload: {
    user,
  },
});

export const fetchUserFailure = (): NavbarAction => ({
  type: 'NAVBAR.USER.FETCH.FAILURE',
});

export function fetchUser() {
  return (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
    dispatch(fetchUserRequest);

    return api(getState)
      .get<User>('/api/users/me')
      .then(({ data }) => dispatch(fetchUserSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchUserFailure());
      });
  };
}
