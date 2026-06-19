import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from '../../types';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../constants/styles';

interface ExplorerHeaderProps {
  tab: TabType;
  chips: string[];
  filter: string;
  query: string;
  onQuery: (text: string) => void;
  onFilter: (filter: string) => void;
  onOpenFilters: () => void;
}

export function ExplorerHeader({
  tab,
  chips,
  filter,
  query,
  onQuery,
  onFilter,
  onOpenFilters,
}: ExplorerHeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  let title = 'Characters';
  let subtitle = 'Find dimension travelers across the multiverse.';
  let placeholder = 'Search characters...';

  if (tab === 'locations') {
    title = 'Locations';
    subtitle = 'Telemetry data across planets, stations and dimensions.';
    placeholder = 'Search locations or dimensions...';
  }

  if (tab === 'episodes') {
    title = 'Episodes';
    subtitle = 'The complete chronicle of interdimensional chaos.';
    placeholder = 'Search episodes or codes...';
  }

  return (
    <View style={styles.header}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>Wubba Lubba Dub-Hub</Text>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.screenTitle}>{title}</Text>
        <TouchableOpacity 
          onPress={() => setIsSearchVisible(!isSearchVisible)}
          style={styles.searchToggle}>
          <Ionicons name="search" size={24} color={colors.ink} />
        </TouchableOpacity>
      </View>
      <Text style={styles.screenSubtitle}>{subtitle}</Text>

      {isSearchVisible && (
        <View style={styles.searchGlass}>
          <Ionicons name="search" size={21} color="#6c776f" />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#7f8a82"
            value={query}
            onChangeText={onQuery}
            style={styles.searchInput}
            autoCorrect={false}
            returnKeyType="search"
          />
          {tab === 'characters' ? (
            <TouchableOpacity onPress={onOpenFilters} style={styles.roundAction}>
              <Ionicons name="options-outline" size={20} color="#10391f" />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chipRow}>
        {chips.map((item) => {
          let label = item;

          if (item === 'All' && tab === 'characters') {
            label = 'All Characters';
          }

          if (item === 'All' && tab === 'locations') {
            label = 'All Locations';
          }

          if (item === 'All' && tab === 'episodes') {
            label = 'All Seasons';
          }

          return (
            <TouchableOpacity
              key={item}
              onPress={() => onFilter(item)}
              style={[styles.chip, filter === item && styles.chipActive]}>
              <Text
                style={[
                  styles.chipText,
                  filter === item && styles.chipTextActive,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    marginBottom: 20,
    backgroundColor: colors.mint,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topBar: {
    height: 58,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: colors.greenDeep,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'left',
    marginLeft: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  screenTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  searchToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenSubtitle: {
    color: colors.muted,
    fontSize: 19,
    lineHeight: 29,
    marginTop: 12,
    maxWidth: 380,
  },
  searchGlass: {
    minHeight: 66,
    borderRadius: 34,
    backgroundColor: 'rgba(239,240,237,0.82)',
    borderColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 26,
    ...globalStyles.shadow,
  },
  searchInput: {
    flex: 1,
    color: colors.ink,
    fontSize: 17,
    minHeight: 58,
    marginLeft: 10,
  },
  roundAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: {
    paddingTop: 24,
    paddingRight: 24,
  },
  chip: {
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: colors.soft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: colors.green,
  },
  chipText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '800',
  },
  chipTextActive: {
    color: '#092116',
  },
});

