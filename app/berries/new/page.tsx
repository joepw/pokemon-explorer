import Link from "next/link";
import { createCustomBerry } from "./actions";

export default async function NewBerryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link href="/berries" className="text-sm underline">
        ← Back to Berries
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Add custom berry
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

      <form action={createCustomBerry} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            required
            placeholder="e.g. myberry"
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Firmness</span>
          <input
            name="firmness"
            required
            placeholder="e.g. soft"
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Size</span>
            <input
              name="size"
              type="number"
              min={1}
              max={1000}
              required
              defaultValue={20}
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Smoothness (0–100)</span>
            <input
              name="smoothness"
              type="number"
              min={0}
              max={100}
              required
              defaultValue={25}
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Growth time</span>
            <input
              name="growthTime"
              type="number"
              min={1}
              max={100}
              required
              defaultValue={3}
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Max harvest</span>
            <input
              name="maxHarvest"
              type="number"
              min={1}
              max={100}
              required
              defaultValue={5}
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded border border-zinc-300 px-4 py-2 font-medium dark:border-zinc-700"
        >
          Add Berry
        </button>
      </form>
    </main>
  );
}
