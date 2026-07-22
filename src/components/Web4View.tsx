import React, { useEffect, useRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewProps,
  NativeSyntheticEvent,
} from 'react-native';

type Web4NavigationEvent = NativeSyntheticEvent<{
  url: string;
  navigationType: 'load' | 'redirect' | 'error';
  code?: number;
  message?: string;
}>;

type Web4ErrorEvent = NativeSyntheticEvent<{
  code: string;
  message: string;
}>;

export interface Web4ViewProps extends ViewProps {
  domain: string;
  embeddedApp?: string;
  hostHeader?: string;
  nodeHost?: string;
  nodePort?: number;
  cacheLimitMb?: number;
  allowHttpsExternal?: boolean;
  style?: any;
  onNavigation?: (event: Web4NavigationEvent) => void;
  onLoadStart?: (event: Web4NavigationEvent) => void;
  onLoadEnd?: (event: Web4NavigationEvent) => void;
  onContentVerified?: (event: { contentId: string; cid: string }) => void;
  onError?: (event: Web4ErrorEvent) => void;
}

const ComponentName = 'Web4View';

const viewManagerConfig = UIManager.getViewManagerConfig(ComponentName);
const NativeWeb4View = viewManagerConfig
  ? requireNativeComponent<Web4ViewProps>(ComponentName)
  : null;

export const isWeb4ViewAvailable = !!viewManagerConfig || Platform.OS === 'web';

export const Web4View: React.FC<Web4ViewProps> = props => {
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!isWeb4ViewAvailable && !warnedRef.current && Platform.OS !== 'web') {
      warnedRef.current = true;
      console.warn(
        `Web4View native component is not linked. Ensure pods/Gradle are rebuilt. Platform=${Platform.OS}`,
      );
    }
  }, []);

  useEffect(() => {
    if (__DEV__) {
      console.log('[🌐 Web4] Web4View: Mounted -', props.domain);
    }
  }, [props.domain, props.nodeHost, props.nodePort, props.cacheLimitMb]);

  if (Platform.OS === 'web') {
    return (
      <View style={[{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }, props.style]}>
         <Text style={{ color: '#00d4ff', fontSize: 18, fontWeight: 'bold' }}>Sovereign Web4 Browser</Text>
         <Text style={{ color: '#fff', marginTop: 10 }}>Accessing: {props.domain}</Text>
         <Text style={{ color: '#888', marginTop: 20, fontSize: 12 }}>Native ZHTP rendering is active on PC.</Text>
      </View>
    );
  }

  if (!isWeb4ViewAvailable || !NativeWeb4View) {
    return null;
  }

  return (
    <NativeWeb4View
      {...props}
      style={[{ backgroundColor: 'transparent' }, props.style]}
    />
  );
};

export default Web4View;
