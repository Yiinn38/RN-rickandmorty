import { API_BASE } from '../constants/config';
import { Character, Location, Episode, ApiResponse } from '../types';

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed ${response.status}`);
  }

  if (text.trim().charAt(0) === '<') {
    throw new Error('The API returned HTML instead of JSON');
  }

  return JSON.parse(text);
}

export async function fetchAll<T>(endpoint: string): Promise<T[]> {
  let url = `${API_BASE}/${endpoint}`;
  let results: T[] = [];

  while (url) {
    const data = await fetchJson(url);
    results = results.concat(data.results || []);
    url = data.info && data.info.next ? data.info.next : null;
  }

  return results;
}

export async function fetchCharacters(
  name?: string,
  species?: string,
  status?: string,
  gender?: string
): Promise<Character[]> {
  const params: string[] = [];

  if (name) params.push(`name=${encodeURIComponent(name)}`);
  if (species) params.push(`species=${encodeURIComponent(species)}`);
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (gender) params.push(`gender=${encodeURIComponent(gender)}`);

  const suffix = params.length ? `?${params.join('&')}` : '';
  const data = await fetchJson(`${API_BASE}/character${suffix}`);

  return data.results || [];
}

export async function fetchLocations(): Promise<Location[]> {
  return fetchAll<Location>('location');
}

export async function fetchEpisodes(): Promise<Episode[]> {
  return fetchAll<Episode>('episode');
}

export async function fetchInitialCharacters(): Promise<ApiResponse<Character>> {
  return fetchJson(`${API_BASE}/character`);
}

