import axios from 'axios';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    method = 'get',
    url,
    data,
    types
  } = callAPI;

  if (typeof url !== 'string') {
    throw new Error('Specify a string URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = {
      ...action,
      ...data
    };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return axios({ method, url, data })
    .then(response => next(actionWith({
      type: successType,
      isSuccess: true,
      response: response.data
    })))
    .catch(error => next(actionWith({
      type: failureType,
      isError: true,
      response: error.response,
      errorMessage: error.message
    })));
};
