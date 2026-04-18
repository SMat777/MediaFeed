// Next.js viser denne fil automatisk mens kategorisiden henter data (Suspense).
// animate-pulse giver en visuel indikation af at indhold er på vej.
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-9 w-32 bg-skeleton rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface rounded-xl border border-line overflow-hidden animate-pulse">
            <div className="h-48 bg-skeleton" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-skeleton rounded" />
              <div className="h-4 bg-skeleton rounded" />
              <div className="h-4 w-3/4 bg-skeleton rounded" />
              <div className="h-3 w-20 bg-skeleton rounded mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
