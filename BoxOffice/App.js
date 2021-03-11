/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
// import AppNavigator from './navigators/AppNavigator';
import AppNavigator from './navigators/AppNavigator';
// import BoxOfficeNavigator from './navigators/BoxOfficeNavigator';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255,45,85)',
    background: '#ffffff',
  },
};

function App() {
  return (
    <NavigationContainer theme={Theme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
