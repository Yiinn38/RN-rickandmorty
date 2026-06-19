import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Character, Episode, Location } from '../../types';
import { Badge } from '../Common/Badge';
import { InfoMini } from '../Common/InfoMini';
import { getIdsFromUrls } from '../../utils/helpers';
import { colors } from '../../constants/colors';

interface EpisodeDetailProps {
  item: Episode;
  characters: Character[];
  location: Location;
  onOpenCharacter: (character: Character) => void;
}

export function EpisodeDetail({
  item,
  characters,
  location,
  onOpenCharacter,
}: EpisodeDetailProps) {
  const [showAll, setShowAll] = useState(false);
  const castIds = getIdsFromUrls(item.characters);
  const cast = characters.filter((character) => castIds.includes(character.id));
  const visibleCast = showAll ? cast : cast.slice(0, 6);

  return (
    <View style={styles.detailContent}>
      <View style={styles.episodeHeroSpace}>
        <View style={styles.portalRingLarge} />
      </View>
      <Badge label={item.episode} active />
      <Text style={styles.detailTitle}>{item.name}</Text>

      <View style={styles.twoColumn}>
        <InfoMini label="Code" value={item.episode} />
        <InfoMini label="Air Date" value={item.air_date} />
      </View>

      <Text style={styles.synopsis}>
        Rick and Morty jump into a high-stakes adventure across the multiverse,
        bending family life, science and chaos into one unstable timeline.
      </Text>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Cast</Text>
        {cast.length > 6 ? (
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles.sectionAction}>
              {showAll ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {visibleCast.map((character) => (
          <TouchableOpacity
            key={character.id}
            onPress={() => onOpenCharacter(character)}
            style={styles.castItemLarge}>
            <Image source={{ uri: character.image }} style={styles.castImageLarge} />
            <Text numberOfLines={1} style={styles.castNameLarge}>
              {character.name}
            </Text>
            <Text style={styles.castRole}>{character.species}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Primary Setting</Text>
      <View style={styles.settingCard}>
        <View style={styles.settingImage}>
          <View style={styles.portalRingSmall} />
        </View>
        <View style={styles.settingCopy}>
          <Text style={styles.lineTitle}>{location ? location.name : 'Earth'}</Text>
          <Text style={styles.cardMeta}>
            {location ? location.dimension : 'Dimension C-137'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContent: {
    paddingHorizontal: 22,
    paddingBottom: 120,
  },
  episodeHeroSpace: {
    height: 140,
    borderRadius: 22,
    backgroundColor: '#13261d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  portalRingLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: colors.green,
    opacity: 0.5,
  },
  portalRingSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 8,
    borderColor: colors.green,
    opacity: 0.4,
  },
  detailTitle: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 16,
  },
  twoColumn: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  synopsis: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionAction: {
    color: colors.green,
    fontSize: 15,
    fontWeight: '700',
  },
  castItemLarge: {
    marginRight: 14,
    alignItems: 'center',
  },
  castImageLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#dce7df',
    marginBottom: 10,
  },
  castNameLarge: {
    width: 90,
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  castRole: {
    width: 90,
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  settingCard: {
    borderRadius: 16,
    backgroundColor: colors.soft,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  settingImage: {
    width: 100,
    height: 100,
    backgroundColor: '#13261d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingCopy: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  lineTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  cardMeta: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 4,
  },
});

