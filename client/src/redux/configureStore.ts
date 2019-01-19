import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import configureReducer from './configureReducer';

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  blacklist: ['routing'],
};

const rootReducer = persistReducer(persistConfig, configureReducer());
const middlewares = [thunk];

export default function configureStore() {
  const devToolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeFn = (process.env.NODE_ENV !== 'production' && devToolsCompose) || compose;
  const store = createStore(rootReducer, composeFn(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);

  return { store, persistor };
}
