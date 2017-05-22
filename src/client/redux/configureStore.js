import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import api2 from '../middleware/api2';
import configureReducer from './configureReducer';

const rootReducer = configureReducer();

const middlewares = [thunk, api, api2];

const configureStoreProd = initialState =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );

const configureStoreDev = initialState => {
  const devMiddlewares = [
    require('redux-immutable-state-invariant')(), // eslint-disable-line global-require, import/no-extraneous-dependencies
    ...middlewares,
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...devMiddlewares)),
  );

  return store;
};

const configureStore = process.env.NODE_ENV === 'production'
  ? configureStoreProd
  : configureStoreDev;

export default configureStore;
