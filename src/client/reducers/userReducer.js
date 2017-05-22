import initialState from '../redux/initialState';
import {
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
} from '../actions/userActions';
import { LOGIN_SUCCESS } from '../actions/authActions';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case CURRENT_USER_REQUEST:
      return {
        ...state,
        currentUser: {
          isFetching: true,
        },
      };

    case CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...action.response,
          isFetching: false,
        },
      };

    case CURRENT_USER_FAILURE:
      return {
        ...state,
        currentUser: {
          isFetching: false,
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...action.response.user,
          isFetching: false,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
