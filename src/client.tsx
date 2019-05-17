import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import ManageScroll from './ManageScroll';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
import { StoreState } from './types';

const { store, persistor } = configureStore((window as any).__REDUX_STATE__ as StoreState);

ReactDOM.hydrate(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    <ManageScroll />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
