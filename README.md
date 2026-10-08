# Pokémon Explorer

A web app for exploring Pokémon and berry data from [PokéAPI](https://pokeapi.co) — browse, search, paginate, inspect details, and add your own custom entries.

## Features

**Pokémon Library** (`/pokemon`)
- Paginated list with sprite cards
- Debounced search across all 1351+ names (custom entries included)
- Detail pages: types, abilities (hidden flagged), base stat bars
- Add custom Pokémon via form (name, types, abilities, HP/attack/defense)

**Berries Library** (`/berries`)
- Paginated list with item sprites
- Search across all berries + customs
- Detail pages: firmness, size, growth, natural gift, flavor potency bars
- Add custom berries via form

Custom entries are stored in local JSON files and merged into search results and detail pages — PokéAPI is read-only, so there's no real create endpoint. The store modules wrap the file access, so swapping in a database later only means changing those.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |

## Stack

- Next.js 16 (App Router, React Server Components, Server Actions, Cache Components)
- Tailwind CSS v4
- Zod for input validation
- Vitest + Testing Library

## Project structure

```
app/                  routes only — parse params, call features, render
  pokemon/            list, detail, add-custom, loading/error states
  berries/            same shape
  layout.tsx          shell: nav, footer, metadata
  not-found.tsx       styled 404
  error.tsx           global error boundary
features/pokemon/     pokemon slice: api.ts (cached fetches), store.ts (zod + JSON), components/
features/berries/     berry slice — same layout, never imports from pokemon
shared/               cross-cutting: hooks/ (debounce, search), ui/ (NavLinks, Sprite)
lib/                  pokeapi.ts (API types), utils.ts (pure helpers)
data/                 custom-pokemon.json, custom-berries.json
```

The two libraries are separate slices under `features/`. Each owns its data access, validation, storage, and components; `app/` routes stay thin. The rule: `features/pokemon` and `features/berries` never import from each other — shared code goes in `shared/` or `lib/`.

## Tests

```bash
npm test
```

Covers the zod schemas, the custom-data stores (fs mocked in-memory), the URL id parser, and the debounce hook.