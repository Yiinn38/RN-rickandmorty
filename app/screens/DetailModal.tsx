import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character, Location, Episode, DetailSelection } from '../../types';
import { CharacterDetail } from '../../components/Details/CharacterDetail';
import { LocationDetail } from '../../components/Details/LocationDetail';
import { EpisodeDetail } from '../../components/Details/EpisodeDetail';
import { colors } from '../../constants/colors';

interface DetailModalProps {
  selected: DetailSelection | null;
  characters: Character[];
  episodes: Episode[];
  locations: Location[];
  onClose: () => void;
  onOpenLocation: (name: string) => void;
  onOpenCharacter: (character: Character) => void;
}

export default function DetailModal({
  selected,
  characters,
  episodes,
  locations,
  onClose,
  onOpenLocation,
  onOpenCharacter,
}: DetailModalProps) {
  if (!selected) {
    return null;
  }

  const { type, item } = selected;
  const relatedEpisodes =
    type === 'character' && item.episode
      ? episodes
          .filter((episode) => item.episode.includes(episode.url))
          .slice(0, 8)
      : episodes.slice(0, 8);

  return (
    <Modal visible animationType="slide">
      <SafeAreaView style={styles.detailSafe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailTopBar}>
            <TouchableOpacity onPress={onClose} style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={24} color={colors.greenDeep} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.detailBrand}>
              {type === 'episode' ? item.name : 'Wubba Lubba Dub-Hub'}
            </Text>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons
                name="share-social-outline"
                size={22}
                color={colors.greenDeep}
              />
            </TouchableOpacity>
          </View>

          {type === 'character' ? (
            <CharacterDetail
              item={item as Character}
              episodes={relatedEpisodes}
              onOpenLocation={onOpenLocation}
            />
          ) : null}

          {type === 'location' ? (
            <LocationDetail
              item={item as Location}
              characters={characters}
              onOpenCharacter={onOpenCharacter}
            />
          ) : null}

          {type === 'episode' ? (
            <EpisodeDetail
              item={item as Episode}
              characters={characters}
              location={locations[0]}
              onOpenCharacter={onOpenCharacter}
            />
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  detailSafe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  detailTopBar: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  detailBrand: {
    flex: 1,
    textAlign: 'center',
    color: colors.greenDeep,
    fontSize: 22,
    fontWeight: '900',
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

