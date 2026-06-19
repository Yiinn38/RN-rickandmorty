export function getIdsFromUrls(urls: string[]): number[] {
  return (urls || [])
    .map((url) => Number(String(url).split('/').pop()))
    .filter(Boolean);
}
