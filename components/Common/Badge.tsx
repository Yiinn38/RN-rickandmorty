import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface BadgeProps {
  label: string;
  active?: boolean;
}

export function Badge({ label, active }: BadgeProps) {
  return (
    <View style={[styles.badge, active && styles.badgeActive]}>
      <Text style={[styles.badgeText, active && styles.badgeTextActive]}>
        {String(label || 'Unknown').toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(243, 244, 242, 0.8)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  badgeActive: {
    backgroundColor: colors.green,
  },
  badgeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  badgeTextActive: {
    color: '#092116',
  },
});

