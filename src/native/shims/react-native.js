import * as ReactNativeWeb from 'react-native-web';

// Re-export everything from react-native-web
export * from 'react-native-web';

// Add missing mobile-only utilities for libraries like react-native-svg and custom components
export const TurboModuleRegistry = {
  get: (name) => null,
  getEnforcing: (name) => null,
};

export const requireNativeComponent = (name) => {
  return (props) => null;
};

export const UIManager = {
  getViewManagerConfig: (name) => null,
};

// Export a default that mimics the React Native object
export default {
  ...ReactNativeWeb,
  TurboModuleRegistry,
  requireNativeComponent,
  UIManager,
};
