import { Platform, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const shadow = Platform.select({
  web: {
    boxShadow: '0 18px 38px rgba(20, 44, 31, 0.08)',
  },
  default: {
    shadowColor: '#142c1f',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 3,
  },
});

export const globalStyles = StyleSheet.create({
  shadow,
  shadowCard: {
    ...shadow,
  },
});

export { colors };

