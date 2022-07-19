import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import configureStore from './redux/store/configureStore';

const store = configureStore();

export default function App() {
  const isLoadingComplete: boolean = useCachedResources();
  const colorScheme: ColorSchemeName = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  else {
    return (
      <Provider store = {store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
          </SafeAreaProvider>
      </Provider>
    );
  }
}
