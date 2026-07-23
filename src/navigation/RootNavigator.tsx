import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DesktopNavigator } from './DesktopNavigator';
import SignInScreen from '../screens/SignInScreen';
import CreateIdentityScreen from '../screens/CreateIdentityScreen';
import RecoverIdentityScreen from '../screens/RecoverIdentityScreen';
import SeedPhraseScreen from '../screens/SeedPhraseScreen';
import MigrationSeedScreen from '../screens/MigrationSeedScreen';
import BrowserAuthScreen from '../screens/BrowserAuthScreen';
import QRScanScreen from '../screens/QRScanScreen';
import BrowserScreen from '../screens/BrowserScreen';
import Web4SearchResultsScreen from '../screens/Web4SearchResultsScreen';
import DappsSearchResultsScreen from '../screens/DappsSearchResultsScreen';
import AppDetailScreen from '../screens/AppDetailScreen';
import WelfareDaoDetailScreen from '../screens/WelfareDaoDetailScreen';
import TransactionDetailScreen from '../screens/explorer/TransactionDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg_darkest },
      }}
    >
      <Stack.Screen name="Main" component={DesktopNavigator} />
      <Stack.Screen name="SignIn" component={SignInScreen as any} options={{ presentation: 'modal' }} />
      <Stack.Screen name="CreateIdentity" component={CreateIdentityScreen as any} options={{ presentation: 'modal' }} />
      <Stack.Screen name="RecoverIdentity" component={RecoverIdentityScreen as any} />
      <Stack.Screen name="SeedPhrase" component={SeedPhraseScreen as any} />
      <Stack.Screen name="MigrationSeed" component={MigrationSeedScreen as any} />
      <Stack.Screen name="BrowserAuth" component={BrowserAuthScreen as any} />
      <Stack.Screen name="QRScan" component={QRScanScreen as any} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Browser" component={BrowserScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Web4SearchResults" component={Web4SearchResultsScreen} />
      <Stack.Screen name="DappsSearchResults" component={DappsSearchResultsScreen} />
      <Stack.Screen name="AppDetail" component={AppDetailScreen} />
      <Stack.Screen name="WelfareDaoDetail" component={WelfareDaoDetailScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
