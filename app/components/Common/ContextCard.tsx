import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface ContextCardProps {
  title: string;
  copy: string;
  icon: any;
}

export function ContextCard({ title, copy, icon }: ContextCardProps) {
  return (
    <View style={styles.contextCard}>
      <View style={styles.contextTitleRow}>
        <MaterialCommunityIcons name={icon} size={22} color={colors.greenDeep} />
        <Text style={styles.contextTitle}>{title}</Text>
      </View>
      <Text style={styles.contextCopy}>{copy}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contextCard: {
    padding: 16,
    marginVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.soft,
  },
  contextTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contextTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '800',
    marginLeft: 10,
  },
  contextCopy: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
});
