import Link from "next/link";

import { PokeBallIcon } from "@/shared/ui/PokeBallIcon";
import { BerryIcon } from "@/shared/ui/BerryIcon";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <PokeBallIcon className="h-20 w-20 drop-shadow-md" />
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
          <span className="text-red-600">Pokémon</span>{" "}
          Explorer
        </h1>
        <p className="mt-2 text-lg text-stone-600">
          Gotta browse &rsquo;em all!
        </p>
        <p className="mt-1 max-w-md text-sm text-stone-500">
          Explore Pokémon and berry data from PokéAPI — browse, search, and add
          your own customs.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/pokemon"
          className="rounded-xl border-2 border-stone-200 bg-[#fffdf7] p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <PokeBallIcon className="h-8 w-8" />
            <h2 className="font-display text-xl font-semibold">
              Pokémon Library
            </h2>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            Search, paginate, view types, abilities, and stats.
          </p>
        </Link>
        <Link
          href="/berries"
          className="rounded-xl border-2 border-stone-200 bg-[#fffdf7] p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <BerryIcon className="h-8 w-8" />
            <h2 className="font-display text-xl font-semibold">
              Berries Library
            </h2>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            Search, paginate, view flavors, firmness, and effects.
          </p>
        </Link>
      </div>
    </main>
  );
}

