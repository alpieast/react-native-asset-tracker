import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AssetsScreen from '../screens/AssetsScreen';
import AssetDetailScreen from '../screens/AssetDetailScreen';
import {RootStackParamList} from './types';
import CustomNavigationHeader from '../components/CustomNavigationHeader';

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
          options={({route}) => ({
            header: () => (
              <CustomNavigationHeader
                title={route.params.asset.name}
                symbol={`(${route.params.asset.symbol})`}
                assetIconComponent={route.params.assetImage}
                backButton={route.params.backButton}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
