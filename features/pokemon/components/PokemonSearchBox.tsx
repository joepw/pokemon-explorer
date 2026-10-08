"use client";

import { useLibrarySearch } from "@/shared/hooks/useLibrarySearch";

export function PokemonSearchBox() {
  const { query, setQuery } = useLibrarySearch({ basePath: "/pokemon" });

  return (
    <div className="mt-4 flex gap-2">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search e.g. char"
        className="flex-1 rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="px-2 py-2 underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
