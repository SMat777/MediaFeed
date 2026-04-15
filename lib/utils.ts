export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
