import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { StoreState } from '../types';
import configureReducer from './configureReducer';

type EnhancedWindow = Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
};

const reducer = configureReducer();
const middlewares = [thunk];

export default function configureStore(initialState?: StoreState) {
  const composeFn =
    (process.env.NODE_ENV !== 'production' &&
      (typeof window !== 'undefined' &&
        (window as EnhancedWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) ||
    compose;
  const store = createStore(reducer, initialState, composeFn(applyMiddleware(...middlewares)));

  return { store };
}
