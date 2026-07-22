import * as ReactNativeWeb from 'react-native-web';

// Re-export everything from react-native-web
export * from 'react-native-web';

// Add missing mobile-only TurboModuleRegistry for libraries like react-native-svg
export const TurboModuleRegistry = {
  get: (name) => null,
  getEnforcing: (name) => null,
};

// Export a default that mimics the React Native object
export default {
  ...ReactNativeWeb,
  TurboModuleRegistry,
};
