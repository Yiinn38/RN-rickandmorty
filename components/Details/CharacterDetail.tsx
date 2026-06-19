import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Character, Episode } from '../../types';
import { Badge } from '../Common/Badge';
import { InfoTile } from '../Common/InfoTile';
import { colors } from '../../constants/colors';

interface CharacterDetailProps {
  item: Character;
  episodes: Episode[];
  onOpenLocation: (name: string) => void;
}

export function CharacterDetail({
  item,
  episodes,
  onOpenLocation,
}: CharacterDetailProps) {
  return (
    <View style={styles.detailContent}>
      <Image source={{ uri: item.image }} style={styles.heroImage} />
      <Text style={styles.detailTitle}>{item.name}</Text>

      <View style={styles.badgeRow}>
        <Badge label={item.species} active />
        <Badge label={item.gender} />
        <Badge label={item.status} active={item.status === 'Alive'} />
      </View>

      <InfoTile
        icon="planet-outline"
        label="Origin"
        value={item.origin?.name}
        onPress={() => onOpenLocation(item.origin?.name)}
      />
      <InfoTile
        icon="location-outline"
        label="Last known location"
        value={item.location?.name}
        onPress={() => onOpenLocation(item.location?.name)}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Associated Episodes</Text>
        <Text style={styles.sectionAction}>{item.episode.length} Episodes</Text>
      </View>

      {episodes.map((episode) => (
        <View key={episode.id} style={styles.episodeLine}>
          <View>
            <Text style={styles.episodeCode}>{episode.episode}</Text>
            <Text style={styles.lineTitle}>{episode.name}</Text>
          </View>
          <Text style={styles.cardMeta}>{episode.air_date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  detailContent: {
    paddingHorizontal: 22,
    paddingBottom: 120,
  },
  heroImage: {
    width: '100%',
    height: 340,
    borderRadius: 22,
    backgroundColor: '#dce7df',
  },
  detailTitle: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 22,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 34,
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 18,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
  },
  sectionAction: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
  },
  episodeLine: {
    paddingVertical: 14,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  episodeCode: {
    alignSelf: 'flex-start',
    color: colors.greenDark,
    backgroundColor: colors.mint,
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  lineTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  cardMeta: {
    color: '#81947f',
    fontSize: 15,
  },
});

