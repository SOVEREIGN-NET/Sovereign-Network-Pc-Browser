import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenLayout, HeaderBar } from '../components';
import PoUWControls from '../components/molecules/PoUWControls';
import { colors, spacing, typography } from '../theme';

const PoUWScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderBar
        title="PoUW Rewards"
        onBackPress={() => navigation?.goBack()}
      />
      <ScreenLayout paddingTop={16}>
        <PoUWControls
          onPendingCountChange={count =>
            console.log('Pending receipts:', count)
          }
          refreshInterval={5000}
        />
      </ScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_darkest,
  },
});

export default PoUWScreen;
