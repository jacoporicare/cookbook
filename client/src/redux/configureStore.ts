import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import configureReducer from './configureReducer';

const rootReducer = configureReducer();
const middlewares = [thunk];

const configureStoreProd = () => createStore(rootReducer, compose(applyMiddleware(...middlewares)));

const configureStoreDev = () => {
  // tslint:disable-next-line no-any
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

  return store;
};

const configureStore =
  process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
