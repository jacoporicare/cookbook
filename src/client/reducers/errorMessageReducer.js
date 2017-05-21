import initialState from '../redux/initialState';
import { RESET_ERROR_MESSAGE } from '../actions/errorMessageActions';

export default function errorMessageReducer(state = initialState.errorMessage, action) {
  const { type, isError, response, errorMessage } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return initialState.errorMessage;
  } else if (isError) {
    if (response) {
      const { status, data } = response;

      if (status === 500 && data && data.code === 11000) {
        return 'Název již existuje';
      }

      if (status === 401) {
        return 'Nesprávný uživatel nebo heslo';
      }
    }

    if (errorMessage === 'Network Error') {
      return 'Nastaly problémy s připojením';
    }

    return errorMessage || 'Nastala neočekávaná chyba';
  }

  return state;
}
