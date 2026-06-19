import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface InfoMiniProps {
  label: string;
  value: string;
}

export function InfoMini({ label, value }: InfoMiniProps) {
  return (
    <View style={styles.infoMini}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoMiniValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoMini: {
    flex: 1,
    paddingHorizontal: 12,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  infoMiniValue: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
});

