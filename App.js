import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Root from './src/navigations';

// console.disableYellowBox = true

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="black"/>
      <SafeAreaView />
      <Root />
      <SafeAreaView />
    </>
  );
};

export default App;
