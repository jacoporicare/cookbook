import { Dispatch } from 'redux';

import api, { handleError } from '../../api';
import { User } from '../../types';

export type AuthAction =
  | { type: 'AUTH.USER.FETCH.REQUEST' }
  | { type: 'AUTH.USER.FETCH.SUCCESS'; payload: { user: User } }
  | { type: 'AUTH.USER.FETCH.FAILURE' };

export const fetchUserRequest = (): AuthAction => ({
  type: 'AUTH.USER.FETCH.REQUEST',
});

export const fetchUserSuccess = (user: User): AuthAction => ({
  type: 'AUTH.USER.FETCH.SUCCESS',
  payload: {
    user,
  },
});

export const fetchUserFailure = (): AuthAction => ({
  type: 'AUTH.USER.FETCH.FAILURE',
});

export function fetchUser() {
  return (dispatch: Dispatch) => {
    dispatch(fetchUserRequest());

    return api()
      .get<User>('/api/users/me')
      .then(({ data }) => dispatch(fetchUserSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchUserFailure());
      });
  };
}
