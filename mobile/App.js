import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import '~/config/ReactotronConfig';

import Index from '~/';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'VirtualizedLists should never be nested',
]);

export default function App() {
  return (
    <>
          <StatusBar backgroundColor="light-content" barStyle="#7159c1" />
          <Index />
          </>
  );
}
