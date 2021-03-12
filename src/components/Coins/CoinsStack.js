import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CoinsScreen } from './CoinsScreen';
import { CoinDetailScreen } from '../CoinDetail/CoinDetailScreen';
import { colors } from '../../res/colors';

const Stack = createStackNavigator();


export const CoinStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Coins' 
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blackPearl,   
                    shadowColor: colors.blackPearl               
                },
                headerTintColor: colors.white
            }}
        >
            <Stack.Screen name='Coins' component={CoinsScreen} /> 
            <Stack.Screen name='CoinDetail' component={CoinDetailScreen} />            
        </Stack.Navigator>
    );
}

/* export default CoinStack */