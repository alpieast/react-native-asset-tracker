import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AssetsScreen from '../screens/AssetsScreen';
import AssetDetailScreen from '../screens/AssetDetailScreen';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AssetsScreen">
        <Stack.Screen
          name="AssetsScreen"
          component={AssetsScreen}
          options={{title: 'Assets', headerShown: false}}
        />
        <Stack.Screen
          name="AssetDetailScreen"
          component={AssetDetailScreen}
          options={{title: 'Asset Detail'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
