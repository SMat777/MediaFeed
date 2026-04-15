# MediaFeed

Nyhedsaggregator der henter artikler fra [Guardian Open Platform](https://open-platform.theguardian.com/) og præsenterer dem i et responsivt grid. Bygget med Next.js 14 App Router, Tailwind CSS og TypeScript.

Projektet er bygget som del af en praktikansøgning til JP/Politikens Hus og spejler kerneforretningen: digital nyhedslevering til læsere.

## Tech stack

- **Next.js 14** – App Router, Server Components, `generateMetadata`
- **Tailwind CSS** – utility-first styling, responsivt grid, `prose`-typografi
- **TypeScript** – typede API-responses og komponent-props
- **Guardian Open Platform** – gratis nyhedsAPI med 500 req/dag

## Funktioner

- Seneste nyheder på forsiden (Server Component, ISR 5 min)
- Kategorinavigation: World, Sport, Culture, Tech, Business
- Artikelside med fuld tekst og Open Graph SEO-metadata
- Klientsøgning med debounce

## Kom i gang

### 1. Klon og installér

```bash
git clone https://github.com/SMat777/MediaFeed.git
cd MediaFeed
npm install
```

### 2. Miljøvariabler

Opret `.env.local` baseret på `.env.example`:

```bash
cp .env.example .env.local
```

Hent en gratis Guardian API-nøgle på [open-platform.theguardian.com](https://open-platform.theguardian.com/access/) og indsæt den i `.env.local`.

### 3. Kør lokalt

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Projektstruktur

```
app/
├── layout.tsx              # Rod-layout med header og footer
├── page.tsx                # Forside: seneste artikler
├── category/[section]/     # Kategoriside
├── article/[id]/           # Fuld artikelvisning
└── search/                 # Søgeresultater
lib/
├── guardian.ts             # Guardian API-service med typede responses
└── utils.ts                # Hjælpefunktioner (formatDate m.fl.)
```
