/** Formaterer ISO 8601-dato til dansk læsbar streng, fx "15. april 2026". */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
