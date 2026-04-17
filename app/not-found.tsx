import Link from 'next/link';

/**
 * Global 404-side.
 *
 * Next.js renderer denne komponent automatisk når:
 * 1. En bruger navigerer til en URL der ikke matcher nogen route
 * 2. En Server Component kalder notFound() fra 'next/navigation'
 *
 * Hvis en mere specifik not-found.tsx findes i en nested mappe
 * (fx app/article/[...slug]/not-found.tsx), bruger Next.js den i stedet.
 * Denne fil er fallback for alle routes uden egen not-found.
 */
export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-bold text-decorative">404</p>
      <h1 className="mt-4 text-2xl font-bold text-heading">
        Siden blev ikke fundet
      </h1>
      <p className="mt-2 text-muted">
        Den side du leder efter findes ikke eller er blevet flyttet.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
      >
        Gå til forsiden
      </Link>
    </div>
  );
}
