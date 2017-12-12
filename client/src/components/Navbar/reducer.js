import initialState from '../../redux/initialState';
import {
  NAVBAR_USER_FETCH_REQUEST,
  NAVBAR_USER_FETCH_SUCCESS,
  NAVBAR_USER_FETCH_FAILURE,
} from './actions';
import { LOGIN_SUCCESS } from '../Auth/actions';

const navbarReducer = (state = initialState.navbar, action) => {
  switch (action.type) {
    case NAVBAR_USER_FETCH_REQUEST:
      return {
        ...state,
        isFetchingUser: true,
      };

    case NAVBAR_USER_FETCH_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload.user,
      };

    case NAVBAR_USER_FETCH_FAILURE:
      return {
        ...state,
        isFetchingUser: false,
        error: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default navbarReducer;
