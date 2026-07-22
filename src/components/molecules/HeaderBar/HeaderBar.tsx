import React, { useEffect, useState, useRef } from 'react';
import { View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { Text, Row } from '../../atoms';
import { colors, spacing, typography, shadows } from '../../../theme';
import { useTranslation } from '../../../i18n';
import { useNodeConnectionStatus } from '../../../hooks/useNodeConnectionStatus';
import { useRewardCounter } from '../../../hooks/useRewardCounter';
import { useSidebar } from '../../../context/SidebarContext';

export interface HeaderBarProps {
  onMenuPress?: () => void;
  onBackPress?: () => void;
  sovAddress?: string;
  isConnected?: boolean;
  onConnectionStatusChange?: (connected: boolean, latencyMs?: number) => void;
  onBalancePress?: () => void;
  showHamburger?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  onMenuPress,
  onBackPress,
  sovAddress,
  isConnected: isConnectedProp,
  onConnectionStatusChange,
  onBalancePress,
  showHamburger = true,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { toggleSidebar } = useSidebar();

  const { displayBalance, maturesAt } = useRewardCounter();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setBannerDismissed(false);
    if (maturesAt) {
      bannerTimerRef.current = setTimeout(() => setBannerDismissed(true), 10_000);
    }
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, [maturesAt]);

  const sovLabel = (() => {
    if (!maturesAt) return `SOV ${displayBalance}`;
    const remaining = maturesAt - Math.floor(Date.now() / 1000);
    if (remaining <= 0) return `SOV ${displayBalance}`;
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const countdown = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return `Eligible in ${countdown}`;
  })();

  const { connectionStatus, latencyMs } = useNodeConnectionStatus(true);
  const isConnected = isConnectedProp ?? connectionStatus === 'connected';

  useEffect(() => {
    onConnectionStatusChange?.(isConnected, latencyMs ?? undefined);
  }, [isConnected, latencyMs, onConnectionStatusChange]);

  const getStatusText = () => {
    if (connectionStatus === 'checking') return t.headerbar.checking;
    if (connectionStatus === 'idle') return t.headerbar.notChecked;
    if (isConnected && latencyMs !== null) return `${latencyMs}ms`;
    return isConnected ? t.headerbar.connected : t.headerbar.offline;
  };

  return (
    <View style={styles.container}>
      <Row style={styles.contentRow}>
        <View style={[styles.sideSlot, styles.leftSlot]}>
          {onBackPress ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.hamburger}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke={colors.text_primary}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          ) : showHamburger && (
            <Pressable
              onPress={() => (onMenuPress ? onMenuPress() : toggleSidebar())}
              style={styles.hamburger}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <View style={styles.hamburgerIcon}>
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
              </View>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={onBalancePress}
          style={styles.centerSection}
          pointerEvents="box-none"
        >
          <Text style={styles.sovLabel}>{sovLabel}</Text>
        </Pressable>

        <View style={[styles.sideSlot, styles.rightSlot]}>
          <Row style={styles.rightSection}>
            <View
              style={[
                styles.statusIndicator,
                connectionStatus === 'checking'
                  ? styles.statusChecking
                  : connectionStatus === 'idle'
                  ? styles.statusIdle
                  : isConnected
                  ? styles.statusConnected
                  : styles.statusDisconnected,
              ]}
            />
            <Text style={{ color: colors.text_secondary, fontSize: 12, fontWeight: '600' }}>
              {getStatusText()}
            </Text>
          </Row>
        </View>
      </Row>

      {maturesAt && !bannerDismissed && (() => {
        const remaining = maturesAt - Math.floor(Date.now() / 1000);
        if (remaining <= 0) return null;
        const hours = Math.ceil(remaining / 3600);
        return (
          <Pressable style={styles.maturationBanner} onPress={() => setBannerDismissed(true)}>
            <Text style={styles.maturationBannerText}>
              {'⏳ Rewards available in ~' + hours + (hours === 1 ? ' hour' : ' hours')}
            </Text>
            <Text style={styles.maturationBannerDismiss}>✕</Text>
          </Pressable>
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg_dark,
    paddingHorizontal: spacing.lg,
    height: 64,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.sm,
    zIndex: 100,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  sideSlot: {
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSlot: {
    justifyContent: 'flex-start',
  },
  rightSlot: {
    justifyContent: 'flex-end',
  },
  hamburger: {
    padding: spacing.sm,
    marginLeft: -spacing.sm,
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    height: 2,
    backgroundColor: colors.text_primary,
    borderRadius: 1,
  },
  centerSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sovLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  statusConnected: {
    backgroundColor: colors.success,
  },
  statusDisconnected: {
    backgroundColor: colors.error,
  },
  statusChecking: {
    backgroundColor: colors.warning,
  },
  statusIdle: {
    backgroundColor: colors.text_secondary,
  },
  rightSection: {
    backgroundColor: colors.bg_darkest,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  maturationBanner: {
    position: 'absolute',
    top: 70,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.warning + '22',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.warning + '44',
  },
  maturationBannerText: {
    fontSize: 13,
    color: colors.warning,
    fontWeight: '600',
  },
  maturationBannerDismiss: {
    fontSize: 16,
    color: colors.warning,
    paddingLeft: spacing.sm,
    opacity: 0.8,
  },
});

export default HeaderBar;
