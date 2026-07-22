import React from 'react';
import { View } from 'react-native';

export const LinearGradient = ({ colors, start, end, style, children }: any) => {
  // Simple CSS gradient approximation
  const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
  return (
    <View style={[{ backgroundImage: gradient }, style]}>
      {children}
    </View>
  );
};

export default LinearGradient;
