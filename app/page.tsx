import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Pokémon Explorer</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browse Pokémon and berries, view their details, and add your own
        customs.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/pokemon"
          className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-400 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
        >
          <h2 className="text-xl font-semibold">Pokémon Library →</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Search, paginate, view types, abilities, and stats.
          </p>
        </Link>
        <Link
          href="/berries"
          className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-400 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
        >
          <h2 className="text-xl font-semibold">Berries Library →</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Search, paginate, view flavors, firmness, and effects.
          </p>
        </Link>
      </div>
    </main>
  );
}

