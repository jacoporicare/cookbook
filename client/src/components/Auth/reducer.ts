import { User } from '../../types';
import { AuthAction } from './actions';

export type AuthState = {
  isAuthenticated: boolean;
  token?: string;
  isSubmitting: boolean;
  isFetchingUser: boolean;
  user?: User;
  error: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: undefined,
  isSubmitting: false,
  isFetchingUser: false,
  user: undefined,
  error: false,
};

function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case 'LOGIN_FORM.LOGIN.REQUEST':
      return {
        ...state,
        isSubmitting: true,
      };

    case 'LOGIN_FORM.LOGIN.SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: true,
        token: action.payload.token,
        isFetchingUser: false,
        user: action.payload.user,
      };

    case 'LOGIN_FORM.LOGIN.FAILURE':
      return {
        ...state,
        isSubmitting: false,
      };

    case 'LOGOUT':
      return initialState;

    case 'AUTH.USER.FETCH.REQUEST':
      return {
        ...state,
        isFetchingUser: true,
      };

    case 'AUTH.USER.FETCH.SUCCESS':
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload.user,
      };

    case 'AUTH.USER.FETCH.FAILURE':
      return {
        ...state,
        isFetchingUser: false,
        error: true,
      };

    default:
      return state;
  }
}

export default authReducer;
