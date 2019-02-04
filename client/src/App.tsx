import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux/configureStore';
import Routes from './Routes';
import ManageScroll from './ManageScroll';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/reboot';

const { store, persistor } = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <ManageScroll />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
