import initialState from '../../redux/initialState';
import { ERROR } from '../../middleware/api2';
import { RESET_ERROR_MESSAGE } from './actions';

const errorMessageReducer = (state = initialState.errorMessage, action) => {
  const { type, [ERROR]: error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return initialState.errorMessage;
  } else if (error) {
    const { response, message } = error;

    if (response) {
      const { status, data } = response;

      if (status === 500 && data && data.code === 11000) {
        return 'Název již existuje';
      }

      if (status === 401) {
        return 'Nesprávný uživatel nebo heslo';
      }
    }

    if (message === 'Network Error') {
      return 'Nastaly problémy s připojením';
    }

    return message || 'Nastala neočekávaná chyba';
  }

  return state;
};

export default errorMessageReducer;
