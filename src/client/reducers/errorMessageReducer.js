import initialState from './initialState';
import { RESET_ERROR_MESSAGE } from '../actions/errorMessageActions';

export default function (state = initialState.errorMessage, action) {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return initialState.errorMessage;
  } else if (error) {
    return error;
  }

  return state;
}
