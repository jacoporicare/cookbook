import { Dispatch } from 'redux';

import { User, StoreState } from '../../types';
import api, { handleError } from '../../api';

interface LoginResponse {
  token: string;
  user: User;
}

export type AuthAction =
  | { type: 'SET_AUTH_TOKEN'; payload: { token: string } }
  | { type: 'LOGIN_FORM.LOGIN.REQUEST' }
  | { type: 'LOGIN_FORM.LOGIN.SUCCESS'; payload: { token: string; user: User } }
  | { type: 'LOGIN_FORM.LOGIN.FAILURE' }
  | { type: 'LOGOUT' };

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
  return (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
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
