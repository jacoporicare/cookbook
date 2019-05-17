import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
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
  const store =
    process.env.BUILD_TARGET === 'server'
      ? createStore(reducer, initialState, composeFn(applyMiddleware(...middlewares)))
      : createStore(
          persistReducer(
            {
              key: 'root',
              storage: createWebStorage('local'),
            },
            reducer,
          ),
          initialState,
          composeFn(applyMiddleware(...middlewares)),
        );
  const persistor = persistStore(store);

  return { store, persistor };
}
