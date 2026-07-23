import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sidebar, SidebarItem } from './Sidebar';
import { HeaderBar, Text } from '../components';
import { colors } from '../theme';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useSidebar } from '../context/SidebarContext';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import SIDNavigator from './SIDNavigator';
import DAOScreen from '../screens/DAOScreen';
import DappsScreen from '../screens/DappsScreen';
import MyStorageScreen from '../screens/MyStorageScreen';
import MyDomainsScreen from '../screens/MyDomainsScreen';
import DevPortalNavigator from './DevPortalNavigator';
import ExplorerNavigator from './ExplorerNavigator';
import SovSwapNavigator from './SovSwapNavigator';

const SearchIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={2} />
    <Path d="M21 21l-4.35-4.35" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const WalletIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth={2} />
    <Circle cx="18" cy="12" r="2" stroke={color} strokeWidth={2} />
  </Svg>
);

const DaoIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StoreIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke={color} strokeWidth={2} />
    <Path d="M9 22V12h6v10" stroke={color} strokeWidth={2} />
  </Svg>
);

const ExplorerIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
    <Path d="M3 12h18M12 3v18" stroke={color} strokeWidth={2} />
    <Path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={2} />
    <Path d="M12 21a9 9 0 0 1-9-9" stroke={color} strokeWidth={2} />
  </Svg>
);

const StorageIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M3 15h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" stroke={color} strokeWidth={2} />
    <Path d="M3 10h18v4H3v-4z" stroke={color} strokeWidth={2} />
    <Path d="M3 5h18v4H3V5z" stroke={color} strokeWidth={2} />
  </Svg>
);

const DevIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SwapIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M7 10L12 15L17 10" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 14L12 9L7 14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DesktopNavigator: React.FC<any> = ({ navigation: rootNavigation }) => {
  const [activeTab, setActiveTab] = useState('search');
  const { isCollapsed } = useSidebar();

  const mainItems: SidebarItem[] = [
    { id: 'search', label: 'Search', icon: <SearchIcon color={activeTab === 'search' ? colors.primary : colors.text_secondary} /> },
    { id: 'sid', label: 'Wallet (SID)', icon: <WalletIcon color={activeTab === 'sid' ? colors.primary : colors.text_secondary} /> },
    { id: 'dao', label: 'Governance', icon: <DaoIcon color={activeTab === 'dao' ? colors.primary : colors.text_secondary} /> },
    { id: 'store', label: 'dApp Store', icon: <StoreIcon color={activeTab === 'store' ? colors.primary : colors.text_secondary} /> },
    { id: 'swap', label: 'Swap', icon: <SwapIcon color={activeTab === 'swap' ? colors.primary : colors.text_secondary} /> },
    { id: 'explorer', label: 'Block Explorer', icon: <ExplorerIcon color={activeTab === 'explorer' ? colors.primary : colors.text_secondary} /> },
  ];

  const secondaryItems: SidebarItem[] = [
    { id: 'storage', label: 'My Storage', icon: <StorageIcon color={activeTab === 'storage' ? colors.primary : colors.text_secondary} /> },
    { id: 'dev', label: 'Developer Portal', icon: <DevIcon color={activeTab === 'dev' ? colors.primary : colors.text_secondary} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'search': return <DashboardScreen navigation={mockNavigation} />;
      case 'sid': return <SIDNavigator />;
      case 'dao': return <DAOScreen navigation={mockNavigation} />;
      case 'store': return <DappsScreen navigation={mockNavigation} />;
      case 'swap': return <SovSwapNavigator />;
      case 'explorer': return <ExplorerNavigator />;
      case 'storage': return <MyStorageScreen navigation={mockNavigation} />;
      case 'dev': return <DevPortalNavigator />;
      default: return <DashboardScreen navigation={mockNavigation} />;
    }
  };

  const mockNavigation = {
    navigate: (route: string, params?: any) => {
      console.log('Navigating to:', route, params);
      // Handle tab switching from within screens
      if (route === 'MyStorage') setActiveTab('storage');
      else if (route === 'DeveloperPortal') setActiveTab('dev');
      else if (route === 'Dashboard') setActiveTab('search');
      else if (route === 'SID') setActiveTab('sid');
      else if (route === 'Swap' || route === 'SwapTab') setActiveTab('swap');
      else if (route === 'DAOMain') setActiveTab('dao');
      else if (route === 'StoreMain') setActiveTab('store');
      else if (route === 'ExplorerDashboard') setActiveTab('explorer');
      else {
        // Forward to root navigation for modals/global screens
        rootNavigation.navigate(route, params);
      }
    },
    goBack: () => rootNavigation.goBack(),
    canGoBack: () => rootNavigation.canGoBack(),
    reset: (state: any) => rootNavigation.reset(state),
    dispatch: (action: any) => rootNavigation.dispatch(action),
  };

  return (
    <View style={styles.container}>
      <Sidebar
        items={mainItems}
        secondaryItems={secondaryItems}
        activeId={activeTab}
        onSelect={setActiveTab}
      />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: colors.bg_darkest,
  },
  content: {
    flex: 1,
  },
});
