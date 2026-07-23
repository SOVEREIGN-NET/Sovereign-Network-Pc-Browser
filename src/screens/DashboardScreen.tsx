import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Animated,
  Dimensions,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNetworkNotices } from '../hooks/useNetworkNotices';
import {
  useTrendingDapps,
  getActivityColor,
} from '../hooks/useTrendingDapps';
import {
  ActivityDot,
  ArrowIcon,
  Button,
  Column,
  DrawerItem,
  HeaderBar,
  Row,
  SideDrawer,
  Text,
} from '../components';
import { colors, spacing, typography, borderRadius } from '../theme';
import SShieldLogo from '../components/atoms/Logo';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SEARCH_BAR_HEIGHT = 44;

/**
 * FIXED HERO CONSTANTS
 */
const LOGO_SIZE = 180; // Larger logo for desktop
const SEARCH_BAR_GAP = spacing.xl;
const SEARCH_BAR_TOTAL_HEIGHT = 56; // Taller search bar
const HERO_HEIGHT = LOGO_SIZE + SEARCH_BAR_GAP + SEARCH_BAR_TOTAL_HEIGHT;
const FIXED_HERO_TOP = (SCREEN_HEIGHT / 2) - (HERO_HEIGHT / 2) - 80;
const HERO_BOTTOM = FIXED_HERO_TOP + HERO_HEIGHT; // Bottom of search bar
const STICKY_GAP = 32;

// The amount we need to scroll to bring the apps list to the "dock" line
const INDICATOR_HEIGHT = 40;
const APPS_SPACER_HEIGHT = SCREEN_HEIGHT * 0.4;
const SNAP_TARGET = INDICATOR_HEIGHT + APPS_SPACER_HEIGHT;

const WideChevronDown: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 32,
}) => (
  <Svg width={size} height={size * 0.4} viewBox="0 0 48 20">
    <Path d="M4 2 L24 18 L44 2" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

const DappRow: React.FC<{
  dapp: { id: string; name: string; desc: string; url: string; activityLevel: string };
  onPress: () => void;
}> = ({ dapp, onPress }) => {
  const activityColor = getActivityColor(dapp.activityLevel as any);
  return (
    <Pressable onPress={onPress} style={styles.dappRow}>
      <Row gap="sm" align="center" style={{ flex: 1 }}>
        <ActivityDot color={activityColor} />
        <Column gap="xs" style={{ flex: 1 }}>
          <Text variant="body" style={{ fontWeight: '600' }}>{dapp.name}</Text>
          <Text variant="caption" style={{ color: colors.text_secondary }}>{dapp.desc}</Text>
        </Column>
      </Row>
    </Pressable>
  );
};

const DashboardScreen: React.FC<any> = ({ navigation }) => {
  const { activeNotice, dismiss } = useNetworkNotices();
  const [urlInput, setUrlInput] = useState('zhtp://central.sov');
  const scrollRef = useRef<ScrollView>(null);

  const bobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, { toValue: -4, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bobAnim, { toValue: 4, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bobAnim, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    bob.start();
    return () => { bob.stop(); };
  }, [bobAnim]);

  const trendingDapps = useTrendingDapps();
  const loadedDapps = useMemo(() => {
    if (!trendingDapps) return [];
    return trendingDapps.slice(0, 10).map(d => ({
      id: d.id,
      name: d.name,
      desc: d.desc,
      url: d.url,
      activityLevel: d.activityLevel,
    }));
  }, [trendingDapps]);

  const openBrowser = useCallback((url?: string) => {
    const targetUrl = url || urlInput;
    if (targetUrl.startsWith('zhtp://') && targetUrl.length > 7) {
      navigation.navigate('Browser', { url: targetUrl });
    } else {
      navigation.navigate('Web4SearchResults', { query: targetUrl });
    }
  }, [navigation, urlInput]);

  const NOTICE_STYLE: Record<'info' | 'warning' | 'error', { bg: string; border: string; text: string; icon: string }> = {
    error:   { bg: '#3D1515', border: '#7B2020', text: '#FF6B6B', icon: '⚠' },
    warning: { bg: '#3D2E00', border: '#7B5C00', text: '#FFB800', icon: '⚡' },
    info:    { bg: '#0D2D45', border: '#0E4B7A', text: '#4FC3F7', icon: 'ℹ' },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_darkest }}>
      <View style={{ zIndex: 500 }}>
        <HeaderBar title="Search" />
        {activeNotice && (
          <Pressable
            onPress={() => dismiss(activeNotice.id)}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: NOTICE_STYLE[activeNotice.level].bg, borderBottomWidth: 1, borderBottomColor: NOTICE_STYLE[activeNotice.level].border, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, gap: spacing.sm }}
          >
            <Text style={{ fontSize: typography.size.sm, color: NOTICE_STYLE[activeNotice.level].text }}>{NOTICE_STYLE[activeNotice.level].icon}</Text>
            <Text style={{ flex: 1, fontSize: typography.size.xs, color: NOTICE_STYLE[activeNotice.level].text, lineHeight: 18 }}>{activeNotice.message}</Text>
            <Text style={{ fontSize: typography.size.md, color: NOTICE_STYLE[activeNotice.level].text, opacity: 0.7 }}>×</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        style={{ flex: 1 }}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <SShieldLogo size={160} />
          <View style={styles.searchBarWrapper}>
            <View style={styles.searchBarInner}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Search or enter zhtp://..."
                  placeholderTextColor={colors.text_placeholder}
                  value={urlInput}
                  onChangeText={setUrlInput}
                  onSubmitEditing={() => openBrowser()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInput}
                />
              </View>
              <Button onPress={() => openBrowser()} size="sm" variant="primary" style={styles.goButton}>
                <ArrowIcon direction="right" size={16} color={colors.text_primary} />
              </Button>
            </View>
          </View>

          <Animated.View
            style={[
              styles.indicatorContainer,
              {
                transform: [{ translateY: bobAnim }],
              },
            ]}
          >
            <Text style={styles.indicatorText}>Scroll down to browse trending domains</Text>
            <WideChevronDown color={colors.text_secondary} size={18} />
          </Animated.View>
        </View>

        {/* APPS SECTION */}
        <View style={styles.appsContainer}>
          <Text variant="h3" style={styles.appsTitle}>Trending Domains</Text>
          <View style={{ gap: spacing.md }}>
            {loadedDapps.map(dapp => (
              <DappRow
                key={dapp.id}
                dapp={dapp}
                onPress={() => openBrowser(dapp.url)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
    width: '100%',
  },
  searchBarWrapper: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 56,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.bg_dark,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  textInput: {
    flex: 1,
    color: colors.text_primary,
    fontSize: 18,
    paddingVertical: 0,
    height: '100%',
  },
  goButton: {
    width: 48,
    height: 48,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  indicatorContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  indicatorText: {
    fontWeight: '600',
    color: colors.text_secondary,
    marginBottom: spacing.xs,
  },
  appsContainer: {
    paddingHorizontal: spacing.xl,
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  appsTitle: {
    marginBottom: spacing.lg,
    color: colors.text_primary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  dappRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.bg_darker,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

// FORCED REWRITE COMMENT
export default DashboardScreen;
