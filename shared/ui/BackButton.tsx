"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  label: string;
}

export function BackButton({ label }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      ← {label}
    </button>
  );
}