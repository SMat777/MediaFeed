'use client';

/**
 * Global error boundary.
 *
 * Next.js kræver at error.tsx er et Client Component ('use client') fordi
 * den fungerer som en React Error Boundary — og error boundaries kan kun
 * fange fejl på klienten via componentDidCatch / getDerivedStateFromError.
 *
 * Props:
 * - error: det kastede Error-objekt (inkl. message og stack)
 * - reset: funktion der re-renderer route-segmentet — giver brugeren
 *          mulighed for at prøve igen uden fuld page refresh
 *
 * Denne boundary fanger runtime-fejl i alle routes der ikke har
 * deres egen error.tsx. Layout-fejl fanges IKKE — de kræver
 * global-error.tsx (ikke implementeret her).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-bold text-decorative">Ups</p>
      <h1 className="mt-4 text-2xl font-bold text-heading">
        Noget gik galt
      </h1>
      <p className="mt-2 text-muted">
        {error.message || 'En uventet fejl opstod. Prøv igen om lidt.'}
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-block rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
      >
        Prøv igen
      </button>
    </div>
  );
}
