import Link from 'next/link';
import Image from 'next/image';
import type { GuardianArticle } from '@/lib/guardian';
import { formatDate, calculateReadingTime } from '@/lib/utils';

interface Props {
  article: GuardianArticle;
}

/**
 * Stort featured artikelkort til forsiden.
 *
 * Viser billede i fuld størrelse med gradient overlay og tekst ovenpå.
 * Fungerer som "forsidehistorien" — den vigtigste artikel der fanger øjet.
 */
export default function HeroArticle({ article }: Props) {
  return (
    <Link
      href={`/article/${article.id}`}
      className="group block relative rounded-2xl overflow-hidden aspect-[16/10]"
    >
      {article.fields?.thumbnail ? (
        <Image
          src={article.fields.thumbnail}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-skeleton" />
      )}
      {/* Gradient overlay for tekstlæsbarhed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {/* Indhold */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-white/80 bg-accent px-2.5 py-1 rounded">
          {article.sectionName}
        </span>
        <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white line-clamp-3">
          {article.webTitle}
        </h1>
        {article.fields?.trailText && (
          <p className="mt-2 text-sm sm:text-base text-white/80 line-clamp-2">
            {article.fields.trailText.replace(/<[^>]+>/g, '')}
          </p>
        )}
        <p className="mt-3 text-xs text-white/60">
          {formatDate(article.webPublicationDate)}
          <span className="mx-1.5">·</span>
          {calculateReadingTime(article.fields?.wordcount)}
        </p>
      </div>
    </Link>
  );
}
