import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Episode } from '../../types';
import { colors } from '../../constants/colors';

interface EpisodeCardProps {
  item: Episode;
  onPress: () => void;
}

export function EpisodeCard({ item, onPress }: EpisodeCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      style={styles.episodeCard}>
      <View style={styles.portalThumb}>
        <View style={styles.portalRing} />
        <View style={styles.portalCore} />
      </View>
      <View style={styles.cardCopy}>
        <Text style={styles.episodeCode}>{item.episode}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardMeta}>{item.air_date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9ab1a3" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  episodeCard: {
    minHeight: 142,
    marginHorizontal: 24,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  portalThumb: {
    width: 112,
    height: 78,
    borderRadius: 14,
    backgroundColor: '#13261d',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  portalRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 10,
    borderColor: colors.green,
    opacity: 0.62,
  },
  portalCore: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#b4ffc9',
  },
  episodeCode: {
    alignSelf: 'flex-start',
    color: colors.greenDark,
    backgroundColor: colors.mint,
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  cardCopy: {
    flex: 1,
    marginLeft: 18,
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
