import Link from "next/link";
import { readCustomBerries } from "@/lib/custom-berries";
import {
  getAllBerryNames,
  getBerryPage,
} from "@/lib/pokeapi-berries";
import type { ListItem } from "@/lib/pokeapi";

export const instant = false;

const PAGE_SIZE = 20;
const SEARCH_LIMIT = 20;

function buildPageHref(page: number, q: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q) params.set("q", q);
  return `/berries?${params.toString()}`;
}

export default async function BerriesPage({
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
    const allNames = await getAllBerryNames();
    const customs = (await readCustomBerries())
      .filter((b) => b.name.includes(q))
      .map((b) => ({ name: b.name, url: "" }));
    items = [...customs, ...allNames.filter((b) => b.name.includes(q))].slice(
      0,
      SEARCH_LIMIT
    );
    subtitle = `${items.length} match${items.length === 1 ? "" : "es"} for “${q}” (showing first ${SEARCH_LIMIT}).`;
  } else {
    const parsed = parseInt(pageParam ?? "1", 10);
    page = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    const offset = (page - 1) * PAGE_SIZE;

    const data = await getBerryPage(offset, PAGE_SIZE);
    items = data.results;
    const totalPages = Math.ceil(data.count / PAGE_SIZE);
    subtitle = `Page ${page} of ${totalPages} · ${data.count} berries total.`;
    hasNext = data.next !== null;
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Berries Library</h1>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browse berries, or{" "}
        <Link href="/berries/new" className="underline">
          add your own custom berry
        </Link>
        .
      </p>

      <form method="get" className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search e.g. pecha"
          className="flex-1 rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
        />
        <button
          type="submit"
          className="rounded border border-zinc-300 px-4 py-2 dark:border-zinc-700"
        >
          Search
        </button>
        {isSearching && (
          <Link href="/berries" className="px-2 py-2 underline">
            Clear
          </Link>
        )}
      </form>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{subtitle}</p>

      <ul className="mt-6 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {items.map((b) => (
          <li
            key={b.name}
            className="flex items-center justify-between px-4 py-3"
          >
            <Link
              href={`/berries/${b.name}`}
              className="font-medium capitalize underline"
            >
              {b.name}
            </Link>
            {!isSearching && (
              <span className="truncate pl-4 font-mono text-xs text-zinc-500">
                {b.url}
              </span>
            )}
          </li>
        ))}
      </ul>

      {!isSearching && (
        <nav className="mt-6 flex items-center justify-between">
          {page > 1 ? (
            <Link href={buildPageHref(page - 1, q)} className="underline">
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {hasNext ? (
            <Link href={buildPageHref(page + 1, q)} className="underline">
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

