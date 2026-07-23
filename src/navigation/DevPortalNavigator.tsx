import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeveloperPortalScreen from '../screens/DeveloperPortalScreen';
import MyDomainsScreen from '../screens/MyDomainsScreen';
import RegisterDaoScreen from '../screens/RegisterDaoScreen';
import OperateNodesScreen from '../screens/OperateNodesScreen';
import UploadDappScreen from '../screens/UploadDappScreen';
import DomainDetailScreen from '../screens/DomainDetailScreen';
import DomainRegistrationScreen from '../screens/DomainRegistrationScreen';
import DomainManagementScreen from '../screens/DomainManagementScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export const DevPortalNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg_darkest, flex: 1, height: '100%' },
      }}
    >
      <Stack.Screen name="DeveloperPortalMain" component={DeveloperPortalScreen} />
      <Stack.Screen name="MyDomains" component={MyDomainsScreen} />
      <Stack.Screen name="RegisterDao" component={RegisterDaoScreen} />
      <Stack.Screen name="OperateNodes" component={OperateNodesScreen} />
      <Stack.Screen name="UploadDapp" component={UploadDappScreen} />
      <Stack.Screen name="DomainDetail" component={DomainDetailScreen} />
      <Stack.Screen name="DomainRegistration" component={DomainRegistrationScreen} />
      <Stack.Screen name="DomainManagement" component={DomainManagementScreen} />
    </Stack.Navigator>
  );
};

export default DevPortalNavigator;
