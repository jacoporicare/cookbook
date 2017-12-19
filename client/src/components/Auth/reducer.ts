import { AuthAction } from './actions';

export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  isSubmitting: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: undefined,
  isSubmitting: false,
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
      };

    case 'LOGIN_FORM.LOGIN.FAILURE':
      return {
        ...state,
        isSubmitting: false,
      };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
