const CARD_COUNT = 20;

export default function BerryListLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="h-9 w-56 animate-pulse rounded bg-stone-200" />
      <div className="mt-3 h-5 w-80 animate-pulse rounded bg-stone-200" />
      <div className="mt-8 h-10 w-full max-w-md animate-pulse rounded-md bg-stone-200" />

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: CARD_COUNT }, (_, i) => (
          <li
            key={i}
            className="h-44 animate-pulse rounded-lg border border-stone-200 bg-stone-100"
          />
        ))}
      </ul>
    </main>
  );
}
