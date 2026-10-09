"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-stone-600">
        The data could not be loaded — PokéAPI may be temporarily
        unavailable. Try again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}