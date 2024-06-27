/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigator from './navigation/AppNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F8F9FA'}}>
      <AppNavigator />
    </SafeAreaView>
  );
}

export default App;
