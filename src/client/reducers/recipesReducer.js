import initialState from './initialState';
import {
  INVALIDATE_RECIPES,
  REQUEST_RECIPES,
  RECEIVE_RECIPES
} from '../constants/actionTypes';

export default function (state = initialState.recipes, action) {
  switch (action.type) {
    case INVALIDATE_RECIPES:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_RECIPES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_RECIPES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.recipes,
        lastUpdated: Date.now()
      };
    default:
      return state;
  }
}
