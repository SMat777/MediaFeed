import Link from 'next/link';
import Image from 'next/image';
import type { GuardianArticle } from '@/lib/guardian';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { toBookmarkData } from '@/lib/bookmark-data';
import BookmarkButton from '@/components/BookmarkButton';

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
    <article className="group bg-surface rounded-2xl border border-line overflow-hidden hover:shadow-xl hover:shadow-black/5 hover:border-line-strong hover:-translate-y-0.5 transition-all duration-300 ease-out relative flex flex-col">
      <BookmarkButton
        article={toBookmarkData(article)}
        className="absolute top-3 right-3 z-10 bg-surface/80 backdrop-blur-sm rounded-full shadow-sm"
      />
      {article.fields?.thumbnail && (
        <div className="overflow-hidden aspect-[16/10]">
          <Image
            src={article.fields.thumbnail}
            alt=""
            width={600}
            height={375}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
          {article.sectionName}
        </span>
        <h2 className="mt-2 text-lg font-bold leading-snug line-clamp-3 text-heading">
          <Link href={`/article/${article.id}`} className="hover:text-accent transition-colors">
            {article.webTitle}
          </Link>
        </h2>
        {article.fields?.trailText && (
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
            {article.fields.trailText.replace(/<[^>]+>/g, '')}
          </p>
        )}
        <div className="mt-auto pt-4">
          <div className="h-px bg-line mb-3" />
          <p className="text-xs text-faint">
            {formatDate(article.webPublicationDate)}
            <span className="mx-1.5">·</span>
            {calculateReadingTime(article.fields?.wordcount)}
          </p>
        </div>
      </div>
    </article>
  );
}
