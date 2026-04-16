# MediaFeed

Nyhedsaggregator der henter artikler fra [Guardian Open Platform](https://open-platform.theguardian.com/) og præsenterer dem i et responsivt grid. Bygget med Next.js, Tailwind CSS og TypeScript.

Projektet demonstrerer moderne frontend-udvikling med fokus på digital nyhedslevering — fra API-integration og server-side rendering til SEO og brugeroplevelse.

## Tech stack

| Teknologi | Rolle |
|---|---|
| **Next.js 16** | App Router, Server Components, ISR, `generateMetadata` |
| **TypeScript** | Typede API-responses, komponent-props og hjælpefunktioner |
| **Tailwind CSS** | Utility-first styling, responsivt grid, `prose`-typografi |
| **Guardian Open Platform** | REST API til nyheder — 500 req/dag på gratis plan |

## Funktioner

- **Forside** — seneste nyheder via Server Component med ISR (5 min cache)
- **Kategorinavigation** — World, Sport, Culture, Tech, Business
- **Artikelvisning** — fuld tekst, hero-billede, brødkrumme, Open Graph metadata
- **Søgning** — klient-side input med 300 ms debounce → server-side API-kald
- **Loading states** — Suspense-skeletons på kategori- og artikelsider
- **Billedoptimering** — `next/image` med lazy loading og WebP-konvertering

## Kom i gang

### 1. Klon og installér

```bash
git clone https://github.com/SMat777/MediaFeed.git
cd MediaFeed
npm install
```

### 2. Miljøvariabler

```bash
cp .env.example .env.local
```

Hent en gratis API-nøgle på [open-platform.theguardian.com/access](https://open-platform.theguardian.com/access/) og indsæt den i `.env.local`.

### 3. Kør lokalt

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Projektstruktur

```
app/
├── layout.tsx                  # Rod-layout: font, nav, footer
├── page.tsx                    # Forside: seneste artikler (Server Component)
├── globals.css                 # Tailwind-import og CSS custom properties
├── category/[section]/
│   ├── page.tsx                # Sektionsside med Guardian-filter
│   └── loading.tsx             # Suspense-skeleton
├── article/[...slug]/
│   ├── page.tsx                # Artikelvisning med fuld tekst + OG-metadata
│   └── loading.tsx             # Suspense-skeleton
└── search/
    └── page.tsx                # Søgeresultater (no-cache)

components/
├── ArticleCard.tsx             # Genbrugeligt artikelkort med billede og teaser
├── Nav.tsx                     # Topnavigation med aktiv-sektion-highlight
└── SearchBar.tsx               # Client Component: debounced søgeinput

lib/
├── guardian.ts                 # Guardian API-service: fetch, typer, caching
└── utils.ts                    # Hjælpefunktioner (formatDate)
```

## Arkitektur-beslutninger

| Beslutning | Begrundelse |
|---|---|
| Server Components som default | Reducerer client-side JS — kun Nav og SearchBar er Client Components |
| ISR med 5 min revalidering | Balancerer friskhed med API-kvote (500 req/dag) |
| Catch-all route `[...slug]` | Guardian artikel-ID'er er stier (`world/2026/apr/15/slug`) — catch-all mapper direkte |
| Debounce på 300 ms | Forhindrer API-kald per tastetryk uden mærkbar forsinkelse |
| `bodyText` kun på detaljesiden | Listevisning henter kun `thumbnail` + `trailText` — sparer 5-10 KB per artikel |

## Licens

MIT
