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
      className="text-sm text-stone-600 underline hover:text-stone-900 cursor-pointer"
    >
      ← {label}
    </button>
  );
}