import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text, Logo, Column, Row, Divider } from '../../components';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  onSecondaryAction?: (id: string) => void;
  secondaryItems: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onSelect,
  secondaryItems,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size={40} />
        <Text variant="h3" style={styles.brandTitle}>Sovereign</Text>
      </View>

      <ScrollView style={styles.content}>
        <Column gap="xs" style={styles.section}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => onSelect(item.id)}
              style={[
                styles.item,
                activeId === item.id && styles.itemActive
              ]}
            >
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              <Text
                style={[
                  styles.label,
                  activeId === item.id && styles.labelActive
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Column>

        <Divider style={styles.divider} />

        <Column gap="xs" style={styles.section}>
          {secondaryItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => onSelect(item.id)}
              style={[
                styles.item,
                activeId === item.id && styles.itemActive
              ]}
            >
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              <Text
                style={[
                  styles.label,
                  activeId === item.id && styles.labelActive
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Column>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.statusBox}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Network Connected</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: '100%',
    backgroundColor: colors.bg_dark,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  header: {
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  brandTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
  },
  itemActive: {
    backgroundColor: colors.bg_darker,
    borderWidth: 1,
    borderColor: colors.primary + '33',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text_secondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  divider: {
    marginHorizontal: spacing.xl,
    marginVertical: spacing.sm,
    opacity: 0.5,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.bg_darkest,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: 11,
    color: colors.text_secondary,
  },
});
