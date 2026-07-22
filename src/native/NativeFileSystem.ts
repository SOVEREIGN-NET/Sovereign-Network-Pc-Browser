import { open, save } from '@tauri-apps/api/dialog';
import { readBinaryFile, writeBinaryFile } from '@tauri-apps/api/fs';

export const NativeFileSystem = {
  /**
   * Opens a native file picker to select a file for upload
   */
  async selectFileForUpload(): Promise<{ name: string; path: string; size: number } | null> {
    try {
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'All Files',
          extensions: ['*']
        }]
      });

      if (selected && typeof selected === 'string') {
        // In a real app, we would get the file size and name from the path
        // For now, returning the path as proof of concept
        const name = selected.split(/[\\\/]/).pop() || 'unknown';
        return {
          name,
          path: selected,
          size: 0, // Placeholder
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to open native file picker:', error);
      return null;
    }
  },

  /**
   * Opens a native save dialog to download a file
   */
  async saveFile(defaultName: string, content: Uint8Array): Promise<boolean> {
    try {
      const filePath = await save({
        defaultPath: defaultName,
      });

      if (filePath) {
        await writeBinaryFile(filePath, content);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to save file:', error);
      return false;
    }
  }
};

export default NativeFileSystem;
