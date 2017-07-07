import { CALL_API } from '../../middleware/api';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const LOGIN_REQUEST = 'LOGIN_FORM.LOGIN.REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_FORM.LOGIN.SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FORM.LOGIN.FAILURE';

export const LOGOUT = 'LOGOUT';

export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  token,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = ({ token, user }) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
    user,
  },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const login = (username, password) => ({
  [CALL_API]: {
    actions: [loginRequest, loginSuccess, loginFailure],
    url: '/api/auth/local',
    method: 'post',
    data: { username, password },
  },
});

export const logout = () => ({
  type: LOGOUT,
});
