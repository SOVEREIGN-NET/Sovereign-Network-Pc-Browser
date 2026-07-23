import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SovSwapHomeScreen from '../screens/sovswap/SovSwapHomeScreen';
import SovSwapDaoDetailScreen from '../screens/sovswap/SovSwapDaoDetailScreen';
import SovSwapMarketDetailScreen from '../screens/sovswap/SovSwapMarketDetailScreen';
import BrowserScreen from '../screens/BrowserScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export const SovSwapNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg_darkest, flex: 1, height: '100%' },
      }}
    >
      <Stack.Screen name="SovSwapMain" component={SovSwapHomeScreen as any} />
      <Stack.Screen name="SovSwapDaoDetail" component={SovSwapDaoDetailScreen as any} />
      <Stack.Screen name="SovSwapMarketDetail" component={SovSwapMarketDetailScreen as any} />
      <Stack.Screen
        name="Browser"
        component={BrowserScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export default SovSwapNavigator;
