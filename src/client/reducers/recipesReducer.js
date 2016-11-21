import initialState from './initialState';
import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES
} from '../constants/actionTypes';

export default function (state = initialState.recipes, action) {
  switch (action.type) {
    case REQUEST_RECIPES:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_RECIPES:
      return {
        ...state,
        isFetching: false,
        items: action.recipes,
        lastUpdated: Date.now()
      };

    default:
      return state;
  }
}
