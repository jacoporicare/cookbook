import { CALL_API } from '../middleware/api';

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';

function fetchCurrentUser() {
  return {
    [CALL_API]: {
      types: [CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE],
      url: '/api/users/me',
    },
  };
}

export function getCurrentUser() {
  return (dispatch, getState) => {
    const { user } = getState();

    if (!user.currentUser.isFetching) {
      dispatch(fetchCurrentUser());
    }
  };
}