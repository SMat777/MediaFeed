import Link from 'next/link';
import Image from 'next/image';
import type { GuardianArticle } from '@/lib/guardian';
import { formatDate, calculateReadingTime } from '@/lib/utils';

interface Props {
  article: GuardianArticle;
}

/**
 * Viser ét artikelkort med billede, sektion, titel, teaser og dato.
 * Genbruges på forsiden og kategorisider.
 *
 * Guardian artikel-ID er en sti (fx "world/2026/apr/15/slug") – det
 * bruges direkte i URL'en via catch-all route /article/[...slug].
 */
export default function ArticleCard({ article }: Props) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {article.fields?.thumbnail && (
        // next/image: lazy loading og automatisk WebP-konvertering.
        // Guardian-domænet er whitelistet i next.config.ts.
        <Image
          src={article.fields.thumbnail}
          alt=""
          width={600}
          height={192}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-red-700">
          {article.sectionName}
        </span>
        <h2 className="mt-2 text-base font-semibold leading-snug line-clamp-3">
          <Link href={`/article/${article.id}`} className="hover:underline">
            {article.webTitle}
          </Link>
        </h2>
        {article.fields?.trailText && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {/* Guardian trailText kan indeholde HTML-tags – stripes til plain text */}
            {article.fields.trailText.replace(/<[^>]+>/g, '')}
          </p>
        )}
        <p className="mt-3 text-xs text-gray-400">
          {formatDate(article.webPublicationDate)}
          <span className="mx-1.5">·</span>
          {calculateReadingTime(article.fields?.wordcount)}
        </p>
      </div>
    </article>
  );
}
