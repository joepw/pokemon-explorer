import { createCustomPokemon } from "./actions";
import { BackButton } from "@/shared/ui/BackButton";

// dynamic: reads searchParams
export const instant = false;

const INPUT_CLASS =
  "rounded-md border border-stone-300 bg-[#fffdf7] px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200";

export default async function NewPokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <BackButton label="Back to Pokémon" />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Add custom Pokémon
      </h1>
      <p className="mt-2 text-stone-600">
        PokéAPI is read-only, so customs are stored locally and merged into
        search results.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <form
        action={createCustomPokemon}
        className="mt-6 flex flex-col gap-4 rounded-xl border border-stone-200 bg-[#fffdf7] p-6 shadow-sm"
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
          className="cursor-pointer mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Add Pokémon
        </button>
      </form>
    </main>
  );
}
