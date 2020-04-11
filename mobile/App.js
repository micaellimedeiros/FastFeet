import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';

import '~/config/ReactotronConfig';

import { store, persistor } from '~/store';

import Index from '~/';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'VirtualizedLists should never be nested',
]);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Index />
          <FlashMessage icon="auto" duration={3000} />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
