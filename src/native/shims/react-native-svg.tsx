import React from 'react';
import { StyleSheet } from 'react-native-web';

// Helper to flatten React Native style arrays and convert RN transforms to CSS strings
const flattenStyle = (style: any) => {
  if (!style) return undefined;
  const flattened = { ...StyleSheet.flatten(style) };

  if (Array.isArray(flattened.transform)) {
    flattened.transform = flattened.transform
      .map((t: any) => {
        const key = Object.keys(t)[0];
        return `${key}(${t[key]})`;
      })
      .join(' ');
  }

  return flattened;
};

// Basic shim for react-native-svg components on web
export const Svg = ({ children, width, height, viewBox, style, ...props }: any) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    style={flattenStyle(style)}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export const Path = ({ style, ...props }: any) => <path style={flattenStyle(style)} {...props} />;
export const Circle = ({ style, ...props }: any) => <circle style={flattenStyle(style)} {...props} />;
export const Rect = ({ style, ...props }: any) => <rect style={flattenStyle(style)} {...props} />;
export const G = ({ style, ...props }: any) => <g style={flattenStyle(style)} {...props} />;
export const Defs = ({ style, ...props }: any) => <defs style={flattenStyle(style)} {...props} />;
export const LinearGradient = ({ style, ...props }: any) => <linearGradient style={flattenStyle(style)} {...props} />;
export const RadialGradient = ({ style, ...props }: any) => <radialGradient style={flattenStyle(style)} {...props} />;
export const Stop = ({ style, ...props }: any) => <stop style={flattenStyle(style)} {...props} />;
export const Polygon = ({ style, ...props }: any) => <polygon style={flattenStyle(style)} {...props} />;
export const Ellipse = ({ style, ...props }: any) => <ellipse style={flattenStyle(style)} {...props} />;
export const Line = ({ style, ...props }: any) => <line style={flattenStyle(style)} {...props} />;
export const Polyline = ({ style, ...props }: any) => <polyline style={flattenStyle(style)} {...props} />;
export const Text = ({ style, ...props }: any) => <text style={flattenStyle(style)} {...props} />;
export const TSpan = ({ style, ...props }: any) => <tspan style={flattenStyle(style)} {...props} />;
export const Pattern = ({ style, ...props }: any) => <pattern style={flattenStyle(style)} {...props} />;
export const Mask = ({ style, ...props }: any) => <mask style={flattenStyle(style)} {...props} />;
export const ClipPath = ({ style, ...props }: any) => <clipPath style={flattenStyle(style)} {...props} />;
export const Use = ({ style, ...props }: any) => <use style={flattenStyle(style)} {...props} />;
export const Symbol = ({ style, ...props }: any) => <symbol style={flattenStyle(style)} {...props} />;
export const Image = ({ style, ...props }: any) => <image style={flattenStyle(style)} {...props} />;




export default Svg;
