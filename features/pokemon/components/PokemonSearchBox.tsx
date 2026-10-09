"use client";

import { useLibrarySearch } from "@/shared/hooks/useLibrarySearch";

export function PokemonSearchBox() {
  const { inputValue, setInputValue } = useLibrarySearch({ basePath: "/pokemon" });

  return (
    <div className="mt-4 flex gap-2">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Search e.g. char"
        className="flex-1 rounded-md border border-stone-300 bg-[#fffdf7] px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
      />
      {inputValue && (
        <button
          type="button"
          onClick={() => setInputValue("")}
          className="px-2 py-2 underline cursor-pointer"
        >
          Clear
        </button>
      )}
    </div>
  );
}
