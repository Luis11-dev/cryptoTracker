/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CoinStack } from './src/components/Coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native';
import { colors } from './src/res/colors';
import { FavoritesStack } from './src/components/Favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name='Coins'
          component={CoinStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('cryptoTracker/src/assets/bank.png')}
              />
            )
          }}
        />

        <Tabs.Screen
          name='Favorites'
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('cryptoTracker/src/assets/star.png')}
              />
            )
          }}
        />
      </Tabs.Navigator>
      {/* <CoinStack /> */}
    </NavigationContainer>
  );
};



/* export default App; */
