import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Text, Button, Column, ProgressBar, HeaderBar, ScreenLayout } from '../components';
import { colors, spacing } from '../theme';

const ClaimUBIScreen = ({ navigation }: any) => {
  const [claimed, setClaimed] = useState(false);

  // Mock UBS data
  const monthlyUBI = 100;
  const nextClaimDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
  const claimedThisMonth = 100;

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      alert('UBS claimed successfully! 100 SOV has been added to your wallet.');
      navigation.goBack();
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_darkest }}>
      <HeaderBar
        title="Universal Basic Services"
        onBackPress={() => navigation.goBack()}
      />
      <ScreenLayout paddingTop={spacing.md}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column gap="lg" style={{ paddingBottom: spacing.xl }}>
            <Card style={{ marginHorizontal: 0 }}>
              <Column gap="md">
                <Card style={{ backgroundColor: colors.bg_darker, marginHorizontal: 0 }}>
                  <Text variant="h3" style={{ color: colors.success, marginBottom: spacing.sm }}>
                    Your Monthly UBS
                  </Text>
                  <Text variant="h1" style={{ color: colors.primary, marginBottom: spacing.xs }}>
                    {monthlyUBI} SOV
                  </Text>
                  <Text variant="caption" style={{ color: colors.text_secondary }}>
                    Distributed automatically every 30 days
                  </Text>
                </Card>

                <Column gap="sm">
                  <Text variant="body" style={{ fontWeight: '600', color: colors.text_primary }}>
                    This Month's Status
                  </Text>
                  <ProgressBar percentage={100} showPercentage />
                  <Text variant="caption" style={{ color: colors.success }}>
                    ✓ Fully claimed ({claimedThisMonth} SOV)
                  </Text>
                </Column>

                <Column gap="sm">
                  <Text variant="body" style={{ fontWeight: '600', color: colors.text_primary }}>
                    Next Claim Available
                  </Text>
                  <Text variant="body" style={{ color: colors.text_secondary }}>{nextClaimDate}</Text>
                </Column>

                <Column gap="sm" style={{ marginTop: spacing.lg, padding: spacing.lg, backgroundColor: colors.bg_darker, borderRadius: 8 }}>
                  <Text variant="h3" style={{ color: colors.text_primary }}>ℹ️ About UBS</Text>
                  <Text variant="body" style={{ color: colors.text_secondary }}>
                    Universal Basic Services is automatically distributed to all SOV network participants who meet identity verification requirements.
                  </Text>
                  <Text variant="body" style={{ color: colors.text_secondary, marginTop: spacing.sm }}>
                    • Distribution: Monthly • Verification: Zero-Knowledge DID • Network-wide: All participants
                  </Text>
                </Column>

                <Button
                  onPress={handleClaim}
                  disabled={claimed}
                  style={{ marginTop: spacing.lg }}
                >
                  {claimed ? 'Claiming...' : 'Claim This Month\'s UBS'}
                </Button>
                <Button onPress={() => navigation.goBack()} variant="outline">
                  Back
                </Button>
              </Column>
            </Card>
          </Column>
        </ScrollView>
      </ScreenLayout>
    </View>
  );
};

export default ClaimUBIScreen;
