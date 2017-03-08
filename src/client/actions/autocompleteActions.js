import { CALL_API } from '../middleware/api';

export const AUTOCOMPLETE_INGREDIENTS_REQUEST = 'AUTOCOMPLETE_INGREDIENTS_REQUEST';
export const AUTOCOMPLETE_INGREDIENTS_SUCCESS = 'AUTOCOMPLETE_INGREDIENTS_SUCCESS';
export const AUTOCOMPLETE_INGREDIENTS_FAILURE = 'AUTOCOMPLETE_INGREDIENTS_FAILURE';

export const AUTOCOMPLETE_SIDE_DISHES_REQUEST = 'AUTOCOMPLETE_SIDE_DISHES_REQUEST';
export const AUTOCOMPLETE_SIDE_DISHES_SUCCESS = 'AUTOCOMPLETE_SIDE_DISHES_SUCCESS';
export const AUTOCOMPLETE_SIDE_DISHES_FAILURE = 'AUTOCOMPLETE_SIDE_DISHES_FAILURE';

function fetchIngredients() {
  return {
    [CALL_API]: {
      types: [
        AUTOCOMPLETE_INGREDIENTS_REQUEST,
        AUTOCOMPLETE_INGREDIENTS_SUCCESS,
        AUTOCOMPLETE_INGREDIENTS_FAILURE,
      ],
      url: '/api/recipes/ingredients',
    },
  };
}

export function loadIngredients() {
  return (dispatch, getState) => {
    const { autocomplete } = getState();

    if (!autocomplete.ingredients.isFetching) {
      dispatch(fetchIngredients());
    }
  };
}

function fetchSideDishes() {
  return {
    [CALL_API]: {
      types: [
        AUTOCOMPLETE_SIDE_DISHES_REQUEST,
        AUTOCOMPLETE_SIDE_DISHES_SUCCESS,
        AUTOCOMPLETE_SIDE_DISHES_FAILURE,
      ],
      url: '/api/recipes/side-dishes',
    },
  };
}

export function loadSideDishes() {
  return (dispatch, getState) => {
    const { autocomplete } = getState();

    if (!autocomplete.sideDishes.isFetching) {
      dispatch(fetchSideDishes());
    }
  };
}
