import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Character, Location } from '../../types';
import { InfoMini } from '../Common/InfoMini';
import { ContextCard } from '../Common/ContextCard';
import { getIdsFromUrls } from '../../utils/helpers';
import { colors } from '../../constants/colors';

interface LocationDetailProps {
  item: Location;
  characters: Character[];
  onOpenCharacter: (character: Character) => void;
}

export function LocationDetail({
  item,
  characters,
  onOpenCharacter,
}: LocationDetailProps) {
  const [showAll, setShowAll] = useState(false);
  const residentIds = getIdsFromUrls(item.residents);
  const residents = characters.filter((character) =>
    residentIds.includes(character.id)
  );
  const visibleResidents = showAll ? residents : residents.slice(0, 6);

  return (
    <View style={styles.detailContent}>
      <Text style={styles.kicker}>Location Profile</Text>
      <Text style={styles.detailTitle}>{item.name}</Text>

      <View style={styles.locationHero}>
        <View style={styles.portalRingLarge} />
        <Text style={styles.locationHeroText}>{item.dimension}</Text>
      </View>

      <View style={styles.twoColumn}>
        <InfoMini label="Type" value={item.type} />
        <InfoMini label="Dimension" value={item.dimension} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Known Residents</Text>
        {residents.length > 6 ? (
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles.sectionAction}>
              {showAll ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {visibleResidents.map((character) => (
          <TouchableOpacity
            key={character.id}
            onPress={() => onOpenCharacter(character)}
            style={styles.castItem}>
            <Image source={{ uri: character.image }} style={styles.castImage} />
            <Text numberOfLines={1} style={styles.castName}>
              {character.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ContextCard
        title="History"
        icon="history"
        copy="Interdimensional telemetry marks this place as a relevant hub for travelers, residents and unstable portal activity."
      />
      <ContextCard
        title="Security Status"
        icon="shield-check-outline"
        copy="Quantum shielding and dimension tracking are active. Council presence remains stable."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailContent: {
    paddingHorizontal: 22,
    paddingBottom: 120,
  },
  kicker: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailTitle: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 22,
  },
  locationHero: {
    height: 180,
    borderRadius: 22,
    backgroundColor: '#13261d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    overflow: 'hidden',
  },
  portalRingLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 14,
    borderColor: colors.green,
    opacity: 0.6,
  },
  locationHeroText: {
    position: 'absolute',
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 200,
  },
  twoColumn: {
    flexDirection: 'row',
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
  },
  sectionAction: {
    color: colors.green,
    fontSize: 15,
    fontWeight: '700',
  },
  castItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dce7df',
    marginBottom: 8,
  },
  castName: {
    width: 80,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
