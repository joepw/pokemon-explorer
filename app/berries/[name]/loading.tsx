export default function BerryDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />

      <div className="mt-4 flex items-center gap-4">
        <div className="h-24 w-24 shrink-0 animate-pulse rounded-lg bg-stone-200" />
        <div className="h-9 w-48 animate-pulse rounded bg-stone-200" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-lg bg-stone-200"
          />
        ))}
      </div>
    </main>
  );
}