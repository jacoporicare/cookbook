import initialState from './initialState';
import { RECEIVE_RECIPES } from '../constants/actionTypes';

export default function (state = initialState.recipes, action) {
  switch (action.type) {
    case RECEIVE_RECIPES:
      return action.recipes;

    default:
      return state;
  }
};
