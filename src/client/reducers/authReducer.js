import initialState from './initialState';
import {
  SET_AUTH_TOKEN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
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
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };

    case LOGOUT:
      return initialState.auth;

    default:
      return state;
  }
}
