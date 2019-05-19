import { User } from '../../types';
import { AuthAction } from './actions';

export type AuthState = {
  isFetchingUser: boolean;
  user?: User;
  error: boolean;
};

const initialState: AuthState = {
  isFetchingUser: false,
  user: undefined,
  error: false,
};

function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
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
