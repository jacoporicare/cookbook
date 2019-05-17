import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { User, StoreState } from '../../types';
import api, { handleError } from '../../api';

type LoginResponse = {
  token: string;
  user: User;
};

export type AuthAction =
  | { type: 'SET_AUTH_TOKEN'; payload: { token: string } }
  | { type: 'LOGIN_FORM.LOGIN.REQUEST' }
  | { type: 'LOGIN_FORM.LOGIN.SUCCESS'; payload: { token: string; user: User } }
  | { type: 'LOGIN_FORM.LOGIN.FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'AUTH.USER.FETCH.REQUEST' }
  | { type: 'AUTH.USER.FETCH.SUCCESS'; payload: { user: User } }
  | { type: 'AUTH.USER.FETCH.FAILURE' };

export const setAuthToken = (token: string): AuthAction => ({
  type: 'SET_AUTH_TOKEN',
  payload: {
    token,
  },
});

export const loginRequest = (): AuthAction => ({
  type: 'LOGIN_FORM.LOGIN.REQUEST',
});

export const loginSuccess = ({ token, user }: LoginResponse): AuthAction => ({
  type: 'LOGIN_FORM.LOGIN.SUCCESS',
  payload: {
    token,
    user,
  },
});

export const loginFailure = (): AuthAction => ({
  type: 'LOGIN_FORM.LOGIN.FAILURE',
});

export function login(username: string, password: string) {
  return (dispatch: ThunkDispatch<StoreState, {}, AuthAction>, getState: () => StoreState) => {
    dispatch(loginRequest());

    return api(getState)
      .post<LoginResponse>('/api/auth/local', { username, password })
      .then(({ data }) => dispatch(loginSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(loginFailure());
      });
  };
}

export const logout = (): AuthAction => ({
  type: 'LOGOUT',
});

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
  return (dispatch: Dispatch, getState: () => StoreState) => {
    dispatch(fetchUserRequest());

    return api(getState)
      .get<User>('/api/users/me')
      .then(({ data }) => dispatch(fetchUserSuccess(data)))
      .catch(error => {
        handleError(error);
        return dispatch(fetchUserFailure());
      });
  };
}
