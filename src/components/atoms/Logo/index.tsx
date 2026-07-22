import React from 'react';
import { Image, View } from 'react-native';
import LogoImage from '../../../assets/logo-icon.jpg';

interface LogoProps {
  size?: number;
}

const SShieldLogo = ({ size = 44 }: LogoProps) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={LogoImage}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SShieldLogo;
