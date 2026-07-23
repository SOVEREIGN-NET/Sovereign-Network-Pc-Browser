import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExplorerDashboardScreen from '../screens/explorer/ExplorerDashboardScreen';
import BlockDetailScreen from '../screens/explorer/BlockDetailScreen';
import TransactionDetailScreen from '../screens/explorer/TransactionDetailScreen';
import WalletDetailScreen from '../screens/explorer/WalletDetailScreen';
import IdentityDetailScreen from '../screens/explorer/IdentityDetailScreen';
import SearchScreen from '../screens/explorer/SearchScreen';
import NetworkTopologyScreen from '../screens/explorer/NetworkTopologyScreen';

const Stack = createNativeStackNavigator();

export const ExplorerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExplorerDashboard" component={ExplorerDashboardScreen} />
      <Stack.Screen name="BlockDetail" component={BlockDetailScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <Stack.Screen name="WalletDetail" component={WalletDetailScreen} />
      <Stack.Screen name="IdentityDetail" component={IdentityDetailScreen} />
      <Stack.Screen name="ExplorerSearch" component={SearchScreen} />
      <Stack.Screen name="NetworkTopology" component={NetworkTopologyScreen} />
    </Stack.Navigator>
  );
};

export default ExplorerNavigator;
