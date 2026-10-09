import Link from "next/link";

import { PokeBallIcon } from "@/shared/ui/PokeBallIcon";

const LINK_CLASS =
  "cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
      <PokeBallIcon className="h-16 w-16 opacity-80" />
      <p className="mt-4 font-display text-6xl font-bold tracking-tight text-red-600">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold">
        This page could not be found
      </h1>
      <p className="mt-2 max-w-md text-stone-600">
        The Pokémon or berry you are looking for does not exist in this
        Pokédex — or it was never catalogued at all.
      </p>
      <nav className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/pokemon" className={LINK_CLASS}>
          Browse Pokémon
        </Link>
        <Link href="/berries" className={LINK_CLASS}>
          Browse Berries
        </Link>
      </nav>
    </main>
  );
}