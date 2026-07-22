import { invoke } from '@tauri-apps/api/tauri';

export interface GeneratedIdentityData {
  status: 'generated';
  did: string;
  deviceId: string;
  publicDilithium: string;
  publicKyber: string;
  timestamp: number;
  masterSeedHex: string;
}

export const NativeIdentityProvisioning = {
  /**
   * Generate identity locally on PC using native Rust engine
   */
  async generateLocalIdentity(displayName: string): Promise<GeneratedIdentityData> {
    return await invoke('generate_local_identity', { displayName });
  },

  async provisionIdentity(displayName: string, serverUrl: string): Promise<GeneratedIdentityData> {
    // Desktop logic: generate then eventually register
    return await this.generateLocalIdentity(displayName);
  },

  async getLocalIdentity(identityIdOrDid: string): Promise<any> {
    const did = await invoke('get_identity');
    if (did === identityIdOrDid) {
      return { status: 'found', did };
    }
    return { status: 'missing' };
  }
};

export default NativeIdentityProvisioning;
