import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';

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
