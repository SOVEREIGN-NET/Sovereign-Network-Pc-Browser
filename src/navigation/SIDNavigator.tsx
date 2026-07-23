import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SIDScreen from '../screens/SIDScreen';
import SendTokensScreen from '../screens/SendTokensScreen';
import ReceiveTokensScreen from '../screens/ReceiveTokensScreen';
import TokenManagementScreen from '../screens/TokenManagementScreen';
import StakeTokensScreen from '../screens/StakeTokensScreen';
import BuyCryptoScreen from '../screens/BuyCryptoScreen';
import TokenDetailScreen from '../screens/TokenDetailScreen';
import PoUWScreen from '../screens/PoUWScreen';
import TransactionDetailScreen from '../screens/explorer/TransactionDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import WalletSettingsScreen from '../screens/WalletSettingsScreen';
import TokenCreatorScreen from '../screens/TokenCreatorScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export const SIDNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg_darkest, flex: 1, height: '100%' },
      }}
    >
      <Stack.Screen name="SIDMain" component={SIDScreen} />
      <Stack.Screen name="SendTokens" component={SendTokensScreen} />
      <Stack.Screen name="ReceiveTokens" component={ReceiveTokensScreen} />
      <Stack.Screen name="TokenCreator" component={TokenCreatorScreen} />
      <Stack.Screen name="TokenManagement" component={TokenManagementScreen} />
      <Stack.Screen name="StakeTokens" component={StakeTokensScreen} />
      <Stack.Screen name="BuyCrypto" component={BuyCryptoScreen} />
      <Stack.Screen name="TokenDetail" component={TokenDetailScreen} />
      <Stack.Screen name="PoUW" component={PoUWScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="WalletSettings" component={WalletSettingsScreen} />
    </Stack.Navigator>
  );
};

export default SIDNavigator;
