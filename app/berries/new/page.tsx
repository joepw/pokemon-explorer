import { createCustomBerry } from "./actions";
import { BackButton } from "@/shared/ui/BackButton";

// dynamic: reads searchParams
export const instant = false;

const INPUT_CLASS =
  "rounded-md border border-stone-300 bg-[#fffdf7] px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200";

export default async function NewBerryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <BackButton label="Back to Berries" />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Add custom berry
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
        action={createCustomBerry}
        className="mt-6 flex flex-col gap-4 rounded-xl border border-stone-200 bg-[#fffdf7] p-6 shadow-sm"
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            required
            placeholder="e.g. myberry"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Firmness</span>
          <input
            name="firmness"
            required
            placeholder="e.g. soft"
            className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
            />
          </label>
        </div>

        <button
          type="submit"
          className="cursor-pointer mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Add Berry
        </button>
      </form>
    </main>
  );
}
