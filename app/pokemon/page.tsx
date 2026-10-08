import Link from "next/link";
import { Suspense } from "react";

import { readCustomPokemon } from "@/features/pokemon/store";
import {
  getAllPokemonNames,
  getPokemonPage,
  getPokemonSpriteUrl,
} from "@/features/pokemon/api";
import { PokemonSearchBox } from "@/features/pokemon/components/PokemonSearchBox";
import { Sprite } from "@/shared/ui/Sprite";
import type { ListItem } from "@/lib/pokeapi";
import { idFromResourceUrl } from "@/lib/utils";

// dynamic: reads searchParams
export const instant = false;

const PAGE_SIZE = 20;
const SEARCH_LIMIT = 20;

function buildPageHref(page: number, q: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q) params.set("q", q);
  return `/pokemon?${params.toString()}`;
}

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageParam, q: qParam } = await searchParams;
  const q = (qParam ?? "").trim().toLowerCase();
  const isSearching = q.length > 0;

  let items: ListItem[] = [];
  let subtitle = "";
  let page = 1;
  let hasNext = false;

  if (isSearching) {
    const allNames = await getAllPokemonNames();
    const customs = (await readCustomPokemon())
      .filter((p) => p.name.includes(q))
      .map((p) => ({ name: p.name, url: "" }));
    items = [...customs, ...allNames.filter((p) => p.name.includes(q))].slice(
      0,
      SEARCH_LIMIT
    );
    subtitle = `${items.length} match${items.length === 1 ? "" : "es"} for “${q}” (showing first ${SEARCH_LIMIT}).`;
  } else {
    const parsed = parseInt(pageParam ?? "1", 10);
    page = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    const offset = (page - 1) * PAGE_SIZE;

    const data = await getPokemonPage(offset, PAGE_SIZE);
    items = data.results;
    const totalPages = Math.ceil(data.count / PAGE_SIZE);
    subtitle = `Page ${page} of ${totalPages} · ${data.count} Pokémon total.`;
    hasNext = data.next !== null;
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Pokémon Library</h1>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browse Pokémon, or{" "}
        <Link href="/pokemon/new" className="underline">
          add your own custom Pokémon
        </Link>
        .
      </p>

      <Suspense fallback={null}>
        <PokemonSearchBox />
      </Suspense>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{subtitle}</p>

      {items.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed px-6 py-12 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No Pokémon match “{q}”.
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => {
            const id = item.url ? idFromResourceUrl(item.url) : null;
            const isCustom = item.url === "";
            const tile = (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-zinc-100 text-3xl font-bold text-zinc-500 dark:bg-zinc-900">
                {item.name.charAt(0).toUpperCase()}
              </div>
            );

            return (
              <li key={item.name}>
                <Link
                  href={`/pokemon/${item.name}`}
                  className="flex h-full flex-col items-center rounded-lg border border-zinc-200 p-4 text-center transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-600"
                >
                  {id !== null ? (
                    <Sprite
                      src={getPokemonSpriteUrl(id)}
                      alt={item.name}
                      width={96}
                      height={96}
                      fallback={tile}
                    />
                  ) : (
                    tile
                  )}
                  <span className="mt-2 flex flex-wrap items-center justify-center gap-1 text-sm font-medium capitalize">
                    {item.name}
                    {isCustom && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-normal text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        custom
                      </span>
                    )}
                  </span>
                  {id !== null && (
                    <span className="text-xs text-zinc-500">#{id}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {!isSearching && (
        <nav className="mt-6 flex items-center justify-between">
          {page > 1 ? (
            <Link
              href={buildPageHref(page - 1, q)}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {hasNext ? (
            <Link
              href={buildPageHref(page + 1, q)}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  );
}


