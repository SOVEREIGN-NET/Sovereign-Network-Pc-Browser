import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import {
  HeaderBar,
  Text,
  Column,
  Row,
  ScreenLayout,
  Card,
  Input,
} from '../components';
import { useAuth } from '../hooks';
import { NativeFileSystem } from '../native/NativeFileSystem';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/tokens';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  mimeType?: string;
}

const MOCK_DATA: FileItem[] = [];

const FolderIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      stroke={color}
      strokeWidth={1.5}
      fill={color + '20'}
    />
  </Svg>
);

const FileIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path d="M13 2v7h7" stroke={color} strokeWidth={1.5} />
  </Svg>
);

const PlusIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

const MyStorageScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { currentIdentity } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid'); // Default to grid on desktop

  const isPremium = currentIdentity?.tier === 'premium';
  const totalStorage = isPremium ? 25 : 10;

  const filteredData = MOCK_DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = async () => {
    const file = await NativeFileSystem.selectFileForUpload();
    if (file) {
      Alert.alert('Upload Started', `Uploading ${file.name} to the Sovereign Network.`);
    }
  };

  const handleFileAction = async (item: FileItem) => {
    if (item.type === 'folder') {
      Alert.alert('Folder', `Opening ${item.name}`);
    } else {
      // Mock download with native save dialog
      const success = await NativeFileSystem.saveFile(item.name, new Uint8Array([0, 1, 2, 3]));
      if (success) {
        Alert.alert('Success', `File ${item.name} saved to your computer.`);
      }
    }
  };

  const renderItem = ({ item }: { item: FileItem }) => {
    if (viewMode === 'grid') {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleFileAction(item)}
          style={styles.gridItem}
        >
          <View style={styles.gridIconWrapper}>
            {item.type === 'folder' ? <FolderIcon color={colors.primary} /> : <FileIcon color={colors.text_secondary} />}
          </View>
          <Text style={styles.gridFileName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.gridFileMeta}>
            {item.type === 'file' ? item.size : item.modified}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleFileAction(item)}
        style={styles.fileRow}
      >
        <Row align="center" gap="md">
          <View style={styles.iconWrapper}>
            {item.type === 'folder' ? <FolderIcon color={colors.primary} /> : <FileIcon color={colors.text_secondary} />}
          </View>
          <Column style={{ flex: 1 }}>
            <Text style={styles.fileName}>{item.name}</Text>
            <Text style={styles.fileMeta}>
              {item.type === 'file' ? `${item.size} • ` : ''}{item.modified}
            </Text>
          </Column>
          <TouchableOpacity onPress={() => Alert.alert('Options', 'File options menu')}>
            <Text style={{ color: colors.text_tertiary, fontSize: 20 }}>⋮</Text>
          </TouchableOpacity>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_darkest }}>
      <HeaderBar onBackPress={() => navigation.goBack()} showHamburger={false} />

      <ScreenLayout paddingTop={spacing.md}>
        <Column gap="lg" style={{ flex: 1 }}>
          {/* Header & Search */}
          <View style={{ paddingHorizontal: spacing.sm }}>
            <Row align="center" justify="space-between" style={{ marginBottom: spacing.md }}>
              <View>
                <Text variant="h2">My Drive</Text>
                <Text style={{ fontSize: 10, color: colors.primary, fontWeight: 'bold', marginTop: 2 }}>
                  {isPremium ? 'PREMIUM STORAGE' : 'FREE TIER'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  {viewMode === 'list' ? (
                    <Path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke={colors.text_secondary} strokeWidth={2} />
                  ) : (
                    <Path d="M3 6h18M3 12h18M3 18h18" stroke={colors.text_secondary} strokeWidth={2} strokeLinecap="round" />
                  )}
                </Svg>
              </TouchableOpacity>
            </Row>

            <View style={styles.searchBar}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ marginRight: spacing.sm }}>
                <Circle cx="11" cy="11" r="8" stroke={colors.text_tertiary} strokeWidth={2} />
                <Path d="M21 21l-4.35-4.35" stroke={colors.text_tertiary} strokeWidth={2} strokeLinecap="round" />
              </Svg>
              <TextInput
                placeholder="Search files and folders"
                placeholderTextColor={colors.text_placeholder}
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Storage Usage Card */}
          <Card style={styles.usageCard}>
            <Column gap="sm">
              <Row justify="space-between" align="center">
                <Text style={styles.usageTitle}>Network Storage</Text>
                <Text style={styles.usagePercent}>0% used</Text>
              </Row>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
              <Text style={styles.usageText}>0 GB of {totalStorage} GB used</Text>
            </Column>
          </Card>

          {/* Files List */}
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={viewMode === 'grid' ? 4 : 1}
            key={viewMode} // Re-render FlatList when switching modes
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={{ color: colors.text_tertiary }}>No files found</Text>
              </View>
            }
          />
        </Column>
      </ScreenLayout>

      {/* Desktop Bottom Action Bar */}
      <View style={styles.desktopActionBar}>
        <Text style={styles.actionBarText}>
          {filteredData.length} items in your drive
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleUpload}
          style={styles.desktopUploadBtn}
        >
          <PlusIcon color={colors.bg_darkest} />
          <Text style={styles.desktopUploadText}>Upload File</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg_dark,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    color: colors.text_primary,
    fontSize: 16,
  },
  usageCard: {
    marginHorizontal: spacing.sm,
    backgroundColor: colors.bg_darker,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  usageTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text_secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  usagePercent: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.bg_dark,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  usageText: {
    fontSize: 12,
    color: colors.text_tertiary,
  },
  fileRow: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '20',
  },
  gridItem: {
    flex: 1/4,
    margin: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.bg_dark,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  gridIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.bg_darker,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  gridFileName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text_primary,
    textAlign: 'center',
  },
  gridFileMeta: {
    fontSize: 11,
    color: colors.text_tertiary,
    marginTop: 4,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.bg_dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text_primary,
  },
  fileMeta: {
    fontSize: 13,
    color: colors.text_tertiary,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  desktopActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: colors.bg_dark,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
  },
  actionBarText: {
    color: colors.text_secondary,
    fontSize: 13,
  },
  desktopUploadBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  desktopUploadText: {
    color: colors.bg_darkest,
    fontWeight: '700',
    fontSize: 15,
  },
});

export default MyStorageScreen;
