import initialState from './initialState';
import {
  SET_AUTH_TOKEN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
} from '../actions/authActions';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: true,
        token: action.response.token,
        user: {
          ...action.response.user,
          isFetching: false,
        },
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };

    case LOGOUT:
      return initialState.auth;

    case CURRENT_USER_REQUEST:
      return {
        ...state,
        user: {
          isFetching: true,
        },
      };

    case CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.response,
          isFetching: false,
        },
      };

    case CURRENT_USER_FAILURE:
      return {
        ...state,
        user: {
          isFetching: false,
        },
      };

    default:
      return state;
  }
}
