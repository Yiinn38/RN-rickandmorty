import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Location } from '../../types';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../constants/styles';

interface LocationCardProps {
  item: Location;
  onPress: () => void;
}

export function LocationCard({ item, onPress }: LocationCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      style={styles.locationCard}>
      <View style={styles.cardCopyCompact}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardMeta}>
          {item.type} - {item.dimension}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9ab1a3" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locationCard: {
    minHeight: 104,
    marginHorizontal: 24,
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: colors.glass,
    borderColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    ...globalStyles.shadow,
  },
  cardCopyCompact: {
    flex: 1,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
  },
  cardMeta: {
    color: '#81947f',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 4,
  },
});
