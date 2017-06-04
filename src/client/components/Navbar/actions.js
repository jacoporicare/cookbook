import { CALL_API } from '../../middleware/api2';

export const NAVBAR_USER_FETCH_REQUEST = 'NAVBAR.USER.FETCH.REQUEST';
export const NAVBAR_USER_FETCH_SUCCESS = 'NAVBAR.USER.FETCH.SUCCESS';
export const NAVBAR_USER_FETCH_FAILURE = 'NAVBAR.USER.FETCH.FAILURE';

export const fetchUserRequest = () => ({
  type: NAVBAR_USER_FETCH_REQUEST,
});

export const fetchUserSuccess = user => ({
  type: NAVBAR_USER_FETCH_SUCCESS,
  payload: {
    user,
  },
});

export const fetchUserFailure = () => ({
  type: NAVBAR_USER_FETCH_FAILURE,
});

export const fetchUser = () => ({
  [CALL_API]: {
    actions: [fetchUserRequest, fetchUserSuccess, fetchUserFailure],
    url: '/api/users/me',
  },
});
