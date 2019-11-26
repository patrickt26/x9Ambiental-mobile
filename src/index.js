import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

// import 'dotenv/config';
// import config from '~/config/env';
import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

// import Router from './routes';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#20B2aB" />
        <App />
      </PersistGate>
    </Provider>
  );
}
