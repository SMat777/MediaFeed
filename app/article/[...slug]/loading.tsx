// Suspense-skeleton der vises mens artikeldata hentes fra Guardian API
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 rounded mb-6" />
      <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
      <div className="h-10 bg-gray-200 rounded mb-2" />
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-24 bg-gray-200 rounded mb-6" />
      <div className="h-64 bg-gray-200 rounded-xl mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
