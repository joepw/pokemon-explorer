export default function PokemonDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="h-48 w-48 shrink-0 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex-1">
          <div className="h-9 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-3 flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-2.5 w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
    </main>
  );
}