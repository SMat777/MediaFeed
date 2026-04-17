/**
 * useBookmarks — hook til bogmærke-funktionalitet med localStorage.
 *
 * Bruger useSyncExternalStore til at synkronisere localStorage med React.
 * Se bookmark-data.ts for typer og hjælpefunktioner.
 *
 * Fordele fremfor useState + useEffect:
 * - Ingen hydration mismatch — getServerSnapshot returnerer [] under SSR
 * - Automatisk re-render i ALLE komponenter der bruger hooket
 * - Tearing-safe — React garanterer konsistent state på tværs af renders
 *
 * Subscriber-mønstret: emitChange() notificerer alle aktive komponenter
 * via listeners-sættet. Når én komponent toggler et bogmærke, re-renderer
 * alle andre komponenter der viser bogmærke-state.
 */

'use client';

import { useSyncExternalStore } from 'react';
import type { BookmarkData } from '@/lib/bookmark-data';

const STORAGE_KEY = 'mediafeed-bookmarks';

// --- Subscriber-system for useSyncExternalStore ---

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((fn) => fn());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Cache forhindrer at getSnapshot returnerer nyt objekt ved hvert kald,
// hvilket ville give uendeligt re-render (React sammenligner med ===).
let cachedRaw = '';
let cachedBookmarks: BookmarkData[] = [];

function getSnapshot(): BookmarkData[] {
  const raw = localStorage.getItem(STORAGE_KEY) ?? '';
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedBookmarks = raw ? JSON.parse(raw) : [];
  }
  return cachedBookmarks;
}

function getServerSnapshot(): BookmarkData[] {
  return [];
}

// --- Public hook ---

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle(article: BookmarkData) {
    const current = getSnapshot();
    const exists = current.some((b) => b.id === article.id);
    const next = exists
      ? current.filter((b) => b.id !== article.id)
      : [...current, article];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    emitChange();
  }

  function isBookmarked(id: string): boolean {
    return bookmarks.some((b) => b.id === id);
  }

  return { bookmarks, toggle, isBookmarked };
}
