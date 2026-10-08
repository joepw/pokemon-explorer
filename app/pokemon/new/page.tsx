import Link from "next/link";
import { createCustomPokemon } from "./actions";

export default async function NewPokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link href="/pokemon" className="text-sm underline">
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
        <p className="mt-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form action={createCustomPokemon} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            required
            placeholder="e.g. mychu"
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Types (comma-separated, max 2)</span>
          <input
            name="types"
            required
            placeholder="e.g. electric, fairy"
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
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
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
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
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
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
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
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
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded border border-zinc-300 px-4 py-2 font-medium dark:border-zinc-700"
        >
          Add Pokémon
        </button>
      </form>
    </main>
  );
}
