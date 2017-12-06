import initialState from '../../redux/initialState';
import { SET_AUTH_TOKEN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actions';

const authReducer = (state = initialState.auth, action) => {
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
        token: action.payload.token,
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
};

export default authReducer;
