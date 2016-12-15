import initialState from './initialState';
import {
  SET_AUTH_TOKEN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE
} from '../actions/authActions';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.token
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.response.token
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        token: null
      };

    case CURRENT_USER_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: true
        }
      };

    case CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.response,
          isFetching: false
        }
      };

    case CURRENT_USER_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false
        }
      };

    default:
      return state;
  }
}
