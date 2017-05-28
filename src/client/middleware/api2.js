import axios from 'axios';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API v2');
export const ERROR = Symbol('Call API Error');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
const apiMiddleware = store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { method = 'get', url, data, actions } = callAPI;

  if (typeof url !== 'string') {
    throw new Error('Specify a string URL.');
  }
  if (!Array.isArray(actions) || actions.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (actions.some(actions => typeof actions !== 'function')) {
    throw new Error('Expected action types to be functions (action creators).');
  }

  const [request, success, failure] = actions;

  next(request());

  const headers = {};
  const token = store.getState().auth.token;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({ method, url, data, headers })
    .then(response => next(success(response.data)))
    .catch(error =>
      next({
        ...failure(error.message, error.response),
        [ERROR]: error,
      }),
    );
};

export default apiMiddleware;
