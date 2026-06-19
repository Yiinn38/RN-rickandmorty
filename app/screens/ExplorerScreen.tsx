import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import { useRickAndMortyData } from '../../hooks/useRickAndMortyData';
import { SPECIES, LOCATIONS, SEASONS } from '../../constants/config';
import { colors } from '../../constants/colors';
import { DetailSelection } from '../../types';

import { LoadingScreen } from '../../components/Common/LoadingScreen';
import { ExplorerHeader } from '../../components/Header/ExplorerHeader';
import { CharacterCard } from '../../components/Cards/CharacterCard';
import { LocationCard } from '../../components/Cards/LocationCard';
import { EpisodeCard } from '../../components/Cards/EpisodeCard';
import { BottomTabs } from '../../components/Common/BottomTabs';
import { FilterSheet } from '../../components/Common/FilterSheet';
import DetailModal from './DetailModal';

export default function ExplorerScreen() {
  const [selected, setSelected] = useState<DetailSelection | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const {
    tab,
    changeTab,
    characters,
    locations,
    episodes,
    loading,
    query,
    setQuery,
    filter,
    setFilter,
    statusFilter,
    setStatusFilter,
    genderFilter,
    setGenderFilter,
    data,
  } = useRickAndMortyData();

  if (loading) {
    return <LoadingScreen />;
  }

  const chips =
    tab === 'locations' ? LOCATIONS : tab === 'episodes' ? SEASONS : SPECIES;

  function openLocationByName(name: string) {
    const found = locations.find(
      (item) => String(item.name).toLowerCase() === String(name).toLowerCase()
    );

    if (found) {
      setSelected({ type: 'location', item: found });
    }
  }

  function openCharacter(character: any) {
    setSelected({ type: 'character', item: character });
  }

  function renderItem({ item }: any) {
    if (tab === 'locations') {
      return (
        <LocationCard
          item={item}
          onPress={() => setSelected({ type: 'location', item })}
        />
      );
    }

    if (tab === 'episodes') {
      return (
        <EpisodeCard
          item={item}
          onPress={() => setSelected({ type: 'episode', item })}
        />
      );
    }

    return (
      <CharacterCard
        item={item}
        onPress={() => setSelected({ type: 'character', item })}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <FlatList
        data={data}
        keyExtractor={(item) => `${tab}-${item.id}`}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        ListHeaderComponent={
          <ExplorerHeader
            tab={tab}
            chips={chips}
            filter={filter}
            query={query}
            onQuery={setQuery}
            onFilter={setFilter}
            onOpenFilters={() => setFiltersOpen(true)}
          />
        }
        ListFooterComponent={<View style={styles.footerSpace} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomTabs activeTab={tab} onChange={changeTab} />

      <DetailModal
        selected={selected}
        characters={characters}
        episodes={episodes}
        locations={locations}
        onClose={() => setSelected(null)}
        onOpenLocation={openLocationByName}
        onOpenCharacter={openCharacter}
      />

      <FilterSheet
        visible={filtersOpen}
        statusFilter={statusFilter}
        genderFilter={genderFilter}
        onStatus={setStatusFilter}
        onGender={setGenderFilter}
        onClose={() => setFiltersOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    paddingBottom: 118,
  },
  footerSpace: {
    height: 28,
  },
});

