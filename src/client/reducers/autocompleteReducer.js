import initialState from './initialState';
import {
  AUTOCOMPLETE_INGREDIENTS_REQUEST,
  AUTOCOMPLETE_INGREDIENTS_SUCCESS,
  AUTOCOMPLETE_INGREDIENTS_FAILURE,
  AUTOCOMPLETE_SIDE_DISHES_REQUEST,
  AUTOCOMPLETE_SIDE_DISHES_SUCCESS,
  AUTOCOMPLETE_SIDE_DISHES_FAILURE,
} from '../actions/autocompleteActions';

export default function autocompleteReducer(state = initialState.autocomplete, action) {
  switch (action.type) {
    case AUTOCOMPLETE_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          isFetching: true,
        },
      };

    case AUTOCOMPLETE_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          isFetching: false,
          items: action.response,
        },
      };

    case AUTOCOMPLETE_INGREDIENTS_FAILURE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          isFetching: false,
        },
      };

    case AUTOCOMPLETE_SIDE_DISHES_REQUEST:
      return {
        ...state,
        sideDishes: {
          ...state.sideDishes,
          isFetching: true,
        },
      };

    case AUTOCOMPLETE_SIDE_DISHES_SUCCESS:
      return {
        ...state,
        sideDishes: {
          ...state.sideDishes,
          isFetching: false,
          items: action.response,
        },
      };

    case AUTOCOMPLETE_SIDE_DISHES_FAILURE:
      return {
        ...state,
        sideDishes: {
          ...state.sideDishes,
          isFetching: false,
        },
      };

    default:
      return state;
  }
}
