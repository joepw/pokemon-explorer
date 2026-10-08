import Link from "next/link";

const LINK_CLASS =
  "rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
      <p className="text-7xl font-bold tracking-tight">404</p>
      <h1 className="mt-4 text-2xl font-bold">
        This page could not be found
      </h1>
      <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
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