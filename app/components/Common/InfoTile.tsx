import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface InfoTileProps {
  label: string;
  value?: string;
  icon: any;
  onPress?: () => void;
}

export function InfoTile({ label, value, icon, onPress }: InfoTileProps) {
  return (
    <TouchableOpacity
      activeOpacity={value === 'unknown' ? 1 : 0.82}
      onPress={onPress}
      style={styles.infoTile}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={22} color={colors.greenDeep} />
      </View>
      <View style={styles.cardCopy}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#9ab1a3" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  infoTile: {
    minHeight: 64,
    borderRadius: 14,
    backgroundColor: colors.soft,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCopy: {
    flex: 1,
    marginLeft: 14,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
