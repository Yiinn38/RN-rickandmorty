import { useEffect, useMemo, useState } from 'react';
import { Character, Location, Episode, TabType } from '../types';
import {
  fetchInitialCharacters,
  fetchCharacters,
  fetchLocations,
  fetchEpisodes,
} from '../services/api';
import { SEARCH_DELAY_MS } from '../constants/config';

export function useRickAndMortyData() {
  const [tab, setTab] = useState<TabType>('characters');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  // Initial data load
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [characterResult, locationResult, episodeResult] = await Promise.allSettled([
          fetchInitialCharacters(),
          fetchLocations(),
          fetchEpisodes(),
        ]);

        if (mounted) {
          setCharacters(
            characterResult.status === 'fulfilled' ? characterResult.value.results || [] : []
          );
          setLocations(locationResult.status === 'fulfilled' ? locationResult.value : []);
          setEpisodes(episodeResult.status === 'fulfilled' ? episodeResult.value : []);
        }
      } catch (error) {
        console.warn('Rick and Morty API error', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // Search/filter characters with debounce
  useEffect(() => {
    let mounted = true;
    const params: string[] = [];

    if (query.trim()) {
      params.push(`name=${encodeURIComponent(query.trim())}`);
    }

    if (filter !== 'All') {
      const speciesValue = filter === 'Mythological' ? 'Mythological Creature' : filter;
      params.push(`species=${encodeURIComponent(speciesValue)}`);
    }

    if (statusFilter !== 'All') {
      params.push(`status=${encodeURIComponent(statusFilter)}`);
    }

    if (genderFilter !== 'All') {
      params.push(`gender=${encodeURIComponent(genderFilter)}`);
    }

    async function searchCharacters() {
      if (tab !== 'characters') {
        return;
      }

      try {
        const result = await fetchCharacters(
          query.trim() || undefined,
          filter !== 'All' ? (filter === 'Mythological' ? 'Mythological Creature' : filter) : undefined,
          statusFilter !== 'All' ? statusFilter : undefined,
          genderFilter !== 'All' ? genderFilter : undefined
        );

        if (mounted) {
          setCharacters(result);
        }
      } catch {
        if (mounted) {
          setCharacters([]);
        }
      }
    }

    const timer = setTimeout(searchCharacters, SEARCH_DELAY_MS);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [filter, genderFilter, query, statusFilter, tab]);

  // Filter characters locally
  const filteredCharacters = useMemo(() => {
    const search = query.trim().toLowerCase();

    return characters.filter((item) => {
      const name = String(item.name || '').toLowerCase();
      const species = String(item.species || '').toLowerCase();
      const status = String(item.status || '').toLowerCase();
      const gender = String(item.gender || '').toLowerCase();
      const speciesNeedle =
        filter === 'Mythological' ? 'mythological' : filter.toLowerCase();

      return (
        name.includes(search) &&
        (filter === 'All' || species.includes(speciesNeedle)) &&
        (statusFilter === 'All' || status === statusFilter.toLowerCase()) &&
        (genderFilter === 'All' || gender === genderFilter.toLowerCase())
      );
    });
  }, [characters, filter, genderFilter, query, statusFilter]);

  // Filter locations
  const filteredLocations = useMemo(() => {
    const search = query.trim().toLowerCase();

    return locations.filter((item) => {
      const name = String(item.name || '').toLowerCase();
      const type = String(item.type || '').toLowerCase();
      const dimension = String(item.dimension || '').toLowerCase();

      return (
        (name.includes(search) || type.includes(search) || dimension.includes(search)) &&
        (filter === 'All' || type === filter.toLowerCase())
      );
    });
  }, [filter, locations, query]);

  // Filter episodes
  const filteredEpisodes = useMemo(() => {
    const search = query.trim().toLowerCase();

    return episodes.filter((item) => {
      const name = String(item.name || '').toLowerCase();
      const code = String(item.episode || '').toLowerCase();
      const season = String(item.episode || '').slice(0, 3);

      return (
        (name.includes(search) || code.includes(search)) &&
        (filter === 'All' || season === filter)
      );
    });
  }, [episodes, filter, query]);

  const data =
    tab === 'locations'
      ? filteredLocations
      : tab === 'episodes'
        ? filteredEpisodes
        : filteredCharacters;

  function changeTab(nextTab: TabType) {
    setTab(nextTab);
    setFilter('All');
    setQuery('');
  }

  return {
    tab,
    setTab,
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
    filteredCharacters,
    filteredLocations,
    filteredEpisodes,
    data,
    changeTab,
  };
}

