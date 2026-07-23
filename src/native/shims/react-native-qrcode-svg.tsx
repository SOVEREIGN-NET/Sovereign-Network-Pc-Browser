import React, { useMemo } from 'react';
import { View } from 'react-native';
import QRCodeGenerator from 'qrcode';
import { Svg, Rect } from './react-native-svg';

interface QRCodeProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  logo?: any;
  logoSize?: number;
  logoBackgroundColor?: string;
  logoMargin?: number;
  logoBorderRadius?: number;
  getRef?: (c: any) => void;
  onError?: (error: any) => void;
}

/**
 * Desktop Shim for react-native-qrcode-svg
 * Uses the pure JS 'qrcode' library to generate SVG modules.
 */
const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  color = '#000000',
  backgroundColor = 'transparent',
}) => {
  const qrData = useMemo(() => {
    try {
      const qr = QRCodeGenerator.create(value, { errorCorrectionLevel: 'M' });
      const numCells = qr.modules.size;
      const cells = [];

      for (let row = 0; row < numCells; row++) {
        for (let col = 0; col < numCells; col++) {
          if (qr.modules.get(row, col)) {
            cells.push({ row, col });
          }
        }
      }

      return { numCells, cells };
    } catch (err) {
      console.error('[QRCode Shim] Failed to generate QR:', err);
      return null;
    }
  }, [value]);

  if (!qrData) return null;

  return (
    <View style={{ width: size, height: size, backgroundColor }}>
       <Svg width={size} height={size} viewBox={`0 0 ${qrData.numCells} ${qrData.numCells}`}>
          {qrData.cells.map((cell) => (
            <Rect
              key={`${cell.row}-${cell.col}`}
              x={cell.col}
              y={cell.row}
              width={1}
              height={1}
              fill={color}
            />
          ))}
       </Svg>
    </View>
  );
};

export default QRCode;
