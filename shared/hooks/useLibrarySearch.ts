"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type UseLibrarySearchOptions = {
  basePath: string;
  debounceMs?: number;
};

/**
 * Manages search state, debouncing input changes to the URL `?q=` parameter.
 * Automatically resets the input if the URL changes externally (e.g. redirects).
 */
export function useLibrarySearch({
  basePath,
  debounceMs = 300,
}: UseLibrarySearchOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const urlQuery = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(urlQuery);
  const [lastSyncedUrlQuery, setLastSyncedUrlQuery] = useState(urlQuery);

  // Sync if URL changed externally (e.g. redirect)
  if (urlQuery !== lastSyncedUrlQuery) {
    setLastSyncedUrlQuery(urlQuery);
    setInputValue(urlQuery);
  }

  useEffect(() => {
    // Only push to URL if the local input has actually changed
    if (inputValue.trim().toLowerCase() === urlQuery.toLowerCase()) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      const normalized = inputValue.trim().toLowerCase();
      if (normalized) params.set("q", normalized);
      
      const suffix = params.size > 0 ? `?${params.toString()}` : "";
      router.replace(`${basePath}${suffix}`);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, urlQuery, basePath, router, debounceMs]);

  return { inputValue, setInputValue };
}
