import { CALL_API } from '../middleware/api';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';

export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  token,
});

export const login = (username, password) => ({
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    url: '/api/auth/local',
    method: 'post',
    data: { username, password },
  },
});

export const logout = () => ({
  type: LOGOUT,
});

const fetchCurrentUser = () => ({
  [CALL_API]: {
    types: [CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE],
    url: '/api/users/me',
  },
});

export const getCurrentUser = () => (dispatch, getState) => {
  const { auth } = getState();

  if (!auth.user.isFetching) {
    dispatch(fetchCurrentUser());
  }
};
