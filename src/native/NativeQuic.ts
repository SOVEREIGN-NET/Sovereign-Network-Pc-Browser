import { invoke } from '@tauri-apps/api/tauri';

export interface RequestOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
  timeout?: number;
  insecure?: boolean;
  alpn?: string;
}

export interface QuicResponse {
  status: number;
  statusText: string;
  body: string;
  ok: boolean;
  headers: Record<string, string>;
}

export const NativeQuic = {
  isSupported: async () => true,

  testConnection: async (host: string, port: number) => {
    return invoke('test_connection', { host, port });
  },

  request: async (url: string, options: RequestOptions): Promise<QuicResponse> => {
    return invoke('send_request', { url, options: {
      method: options.method || 'GET',
      body: options.body || '',
      headers: options.headers || {},
      timeout: options.timeout,
      insecure: options.insecure,
      alpn: options.alpn
    }});
  },

  bindIdentity: async (identity: any) => {
    if (!identity) return invoke('bind_identity', { identity: null });

    return invoke('bind_identity', {
      identity: {
        did: identity.did,
        identity_json: JSON.stringify(identity), // Simplification for now
        dilithium_sk: Array.from(new Uint8Array(32)), // Placeholder: needs real keys
        kyber_sk: Array.from(new Uint8Array(32)),
        master_seed: Array.from(new Uint8Array(32)),
      }
    });
  },

  cancelAll: async () => {
    return invoke('cancel_all');
  }
};

export default NativeQuic;
