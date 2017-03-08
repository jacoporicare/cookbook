import { CALL_API } from '../middleware/api';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export function setAuthToken(token) {
  return {
    type: SET_AUTH_TOKEN,
    token,
  };
}

export function login(username, password) {
  return {
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      url: '/api/auth/local',
      method: 'post',
      data: { username, password },
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
