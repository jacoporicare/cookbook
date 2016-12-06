import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';

const middlewares = [
  thunk,
  api
];

function configureStoreProd(initialState) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

function configureStoreDev(initialState) {
  const devMiddlewares = [
    require('redux-immutable-state-invariant')(), // eslint-disable-line global-require, import/no-extraneous-dependencies
    ...middlewares
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...devMiddlewares)
  ));

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
