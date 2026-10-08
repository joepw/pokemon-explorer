import Link from "next/link";
import { createCustomPokemon } from "./actions";

export const instant = false;

const INPUT_CLASS =
  "rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950";

export default async function NewPokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/pokemon"
        className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back to Pokémon
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Add custom Pokémon
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        PokéAPI is read-only, so customs are stored locally and merged into
        search results.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <form
        action={createCustomPokemon}
        className="mt-6 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            required
            placeholder="e.g. mychu"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Types (comma-separated, max 2)</span>
          <input
            name="types"
            required
            placeholder="e.g. electric, fairy"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            Abilities (comma-separated, max 4)
          </span>
          <input
            name="abilities"
            required
            placeholder="e.g. static, lightning-rod"
            className={INPUT_CLASS}
          />
        </label>

        <div className="grid grid-cols-3 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">HP</span>
            <input
              name="hp"
              type="number"
              min={1}
              max={255}
              required
              defaultValue={50}
              className={INPUT_CLASS}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Attack</span>
            <input
              name="attack"
              type="number"
              min={1}
              max={255}
              required
              defaultValue={50}
              className={INPUT_CLASS}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Defense</span>
            <input
              name="defense"
              type="number"
              min={1}
              max={255}
              required
              defaultValue={50}
              className={INPUT_CLASS}
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Add Pokémon
        </button>
      </form>
    </main>
  );
}
