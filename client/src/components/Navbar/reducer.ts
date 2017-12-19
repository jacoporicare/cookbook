import { User } from '../../types';
import { NavbarAction } from './actions';
import { AuthAction } from '../Auth/actions';

export interface NavbarState {
  isFetchingUser: boolean;
  user?: User;
  error: boolean;
}

const initialState: NavbarState = {
  isFetchingUser: false,
  user: undefined,
  error: false,
};

function navbarReducer(
  state: NavbarState = initialState,
  action: NavbarAction | AuthAction,
): NavbarState {
  switch (action.type) {
    case 'NAVBAR.USER.FETCH.REQUEST':
      return {
        ...state,
        isFetchingUser: true,
      };

    case 'NAVBAR.USER.FETCH.SUCCESS':
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload.user,
      };

    case 'NAVBAR.USER.FETCH.FAILURE':
      return {
        ...state,
        isFetchingUser: false,
        error: true,
      };

    case 'LOGIN_FORM.LOGIN.SUCCESS':
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload.user,
      };

    default:
      return state;
  }
}

export default navbarReducer;
