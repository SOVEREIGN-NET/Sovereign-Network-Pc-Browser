/**
 * BuyCryptoScreen
 * Coinme on-ramp integration — loads the Coinme widget in a WebView
 * so users can buy crypto with cash (US retail locations) or card.
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text, HeaderBar } from '../components';
import { colors, spacing, borderRadius } from '../theme/tokens';
import coinmeService from '../services/CoinmeService';

const BuyCryptoScreen = ({ navigation, route }: any) => {
  const walletAddress = route?.params?.walletAddress;
  const [widgetUrl, setWidgetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWidget();
  }, []);

  const loadWidget = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (coinmeService.isConfigured) {
        // Use authenticated session when credentials are available
        const session = await coinmeService.createWidgetSession({
          walletAddress,
          cryptocurrency: 'POL',
          fiatCurrency: 'USD',
        });
        setWidgetUrl(session.widgetUrl);
      } else {
        // Fallback: load widget directly (limited functionality)
        const url = coinmeService.buildDirectWidgetUrl({
          cryptocurrency: 'POL',
          walletAddress,
        });
        setWidgetUrl(url);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load';
      console.error('[BuyCryptoScreen] Widget load failed:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  if (loading && !widgetUrl) {
    return (
      <View style={styles.container}>
        <HeaderBar
          title="Buy Crypto"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Coinme...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <HeaderBar
          title="Buy Crypto"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadWidget} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Buy Crypto"
        onBackPress={() => navigation.goBack()}
      />

      {widgetUrl && (
        <View style={{ flex: 1 }}>
          <iframe
            src={widgetUrl}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              borderWidth: 0,
            } as any}
            onLoad={() => setLoading(false)}
          />
        </View>
      )}

      {loading && widgetUrl && (
        <View style={styles.overlay} pointerEvents="none">
          <ActivityIndicator size="small" color={colors.text_secondary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_darkest,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.bg_darkest,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  loadingText: {
    color: colors.text_secondary,
    marginTop: spacing.md,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.base,
  },
  retryText: {
    color: colors.text_primary,
    fontSize: 14,
    fontWeight: '600',
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg_darkest,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    right: spacing.md,
  },
});

export default BuyCryptoScreen;
