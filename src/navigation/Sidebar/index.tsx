import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text, Logo, Column, Row, Divider } from '../../components';
import { colors, spacing, typography, borderRadius } from '../../theme';
import { useSidebar } from '../../context/SidebarContext';

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
  const { isCollapsed } = useSidebar();

  return (
    <View style={[styles.container, isCollapsed && styles.containerCollapsed]}>
      <View style={[styles.header, isCollapsed && styles.headerCollapsed]}>
        <Logo size={isCollapsed ? 32 : 40} />
        {!isCollapsed && <Text variant="h3" style={styles.brandTitle}>Sovereign</Text>}
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
                isCollapsed && styles.itemCollapsed,
                activeId === item.id && styles.itemActive
              ]}
            >
              {activeId === item.id && (
                <View
                  style={{
                    position: 'absolute',
                    left: isCollapsed ? -10 : -14,
                    width: 3,
                    height: 20,
                    backgroundColor: colors.primary,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    boxShadow: `0 0 10px ${colors.primary}`
                  } as any}
                />
              )}
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              {!isCollapsed && (
                <Text
                  style={[
                    styles.label,
                    activeId === item.id && styles.labelActive
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}

          {secondaryItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => onSelect(item.id)}
              style={[
                styles.item,
                isCollapsed && styles.itemCollapsed,
                activeId === item.id && styles.itemActive
              ]}
            >
              {activeId === item.id && (
                <View
                  style={{
                    position: 'absolute',
                    left: isCollapsed ? -10 : -14,
                    width: 3,
                    height: 20,
                    backgroundColor: colors.primary,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    boxShadow: `0 0 10px ${colors.primary}`
                  } as any}
                />
              )}
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              {!isCollapsed && (
                <Text
                  style={[
                    styles.label,
                    activeId === item.id && styles.labelActive
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </Column>
      </ScrollView>
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
    transition: 'width 0.2s ease-in-out', // Smooth transition for web
  } as any,
  containerCollapsed: {
    width: 80,
  },
  header: {
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    height: 80,
  },
  headerCollapsed: {
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  brandTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    color: colors.primary,
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
    marginBottom: 4,
    position: 'relative',
  },
  itemCollapsed: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: borderRadius.lg,
  },
  itemActive: {
    backgroundColor: colors.primary + '18',
    borderWidth: 1,
    borderColor: colors.primary + '55',
    boxShadow: `0 0 12px ${colors.primary}22`,
  } as any,
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text_secondary,
  },
  labelActive: {
    color: colors.primary,
  },
});


