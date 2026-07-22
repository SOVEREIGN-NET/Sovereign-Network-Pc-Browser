import { invoke } from '@tauri-apps/api/tauri';

export const NativeQuicSession = {
  openSession: async (identityDid: string, host: string, port: number, alpn: number, sni: string | null, spkiPinHex: string | null) => {
    // Tauri logic for persistent QUIC sessions TBD
    return 'session_placeholder';
  },

  closeSession: (sessionId: string) => {
    // TBD
  },

  rpc: async (sessionId: string, method: string, path: string, headersJson: string | null, bodyB64: string | null) => {
    // TBD
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      body: '{}',
      ok: true
    };
  },

  openInbound: async (sessionId: string, path: string) => {
    return 'inbound_placeholder';
  },

  closeInbound: (streamId: string) => {
    // TBD
  }
};

export default NativeQuicSession;
