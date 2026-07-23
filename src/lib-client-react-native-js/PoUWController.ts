/**
 * PoUWController Mock for Desktop
 * Provides the same interface as the mobile version but with no-op implementation
 * for browser environments where native PoUW modules are unavailable.
 */

export type ProofType =
  | 'hash'
  | 'merkle'
  | 'signature'
  | 'web4manifestroute'
  | 'web4contentserved';

export interface PoUWControllerConfig {
  nodeApiBase: string;
  batchIntervalMs?: number;
  maxBatchSize?: number;
}

export class PoUWController {
  private static instance: PoUWController | null = null;
  private isRunning = false;

  private constructor(_config: PoUWControllerConfig) {}

  static getInstance(config?: PoUWControllerConfig): PoUWController {
    if (!PoUWController.instance) {
      if (!config) {
        throw new Error(
          'PoUWController must be initialized with config on first call',
        );
      }
      PoUWController.instance = new PoUWController(config);
    }
    return PoUWController.instance;
  }

  async start(): Promise<void> {
    if (this.isRunning) return;
    console.log('[PoUW] Mock controller started (Desktop)');
    this.isRunning = true;
  }

  async stop(): Promise<void> {
    console.log('[PoUW] Mock controller stopped (Desktop)');
    this.isRunning = false;
  }

  async flush(): Promise<any> {
    return null;
  }

  async recordWeb4ManifestRoute(_opts: any): Promise<void> {
    // No-op on desktop mock
  }

  async recordWeb4ContentServed(_opts: any): Promise<void> {
    // No-op on desktop mock
  }

  get pendingCount(): number {
    return 0;
  }

  get running(): boolean {
    return this.isRunning;
  }
}

export default PoUWController;
