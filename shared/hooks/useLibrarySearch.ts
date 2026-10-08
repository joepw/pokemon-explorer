"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

type UseLibrarySearchOptions = {
  basePath: string;
  debounceMs?: number;
};

/**
 * Debounces the input and syncs it to `?q=`. Fetching stays on the server
 * page. Needs a Suspense boundary (uses useSearchParams).
 */
export function useLibrarySearch({
  basePath,
  debounceMs = 300,
}: UseLibrarySearchOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebouncedValue(query.trim().toLowerCase(), debounceMs);

  useEffect(() => {
    if (debouncedQuery === initialQuery.toLowerCase()) return;
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    const suffix = params.size > 0 ? `?${params.toString()}` : "";
    router.replace(`${basePath}${suffix}`);
  }, [debouncedQuery, initialQuery, basePath, router]);

  return { query, setQuery };
}
