/** Formaterer ISO 8601-dato til dansk læsbar streng, fx "15. april 2026". */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Estimerer læsetid baseret på ordantal.
 * 238 ord/min er gennemsnitlig læsehastighed for non-fiction (Brysbaert, 2019).
 * Returnerer "1 min" som minimum — en artikel føles aldrig "0 min".
 */
export function calculateReadingTime(wordcount: string | undefined): string {
  if (!wordcount) return '1 min';
  const minutes = Math.ceil(parseInt(wordcount, 10) / 238);
  return `${minutes || 1} min`;
}
