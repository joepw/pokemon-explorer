"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/pokemon", label: "Pokémon" },
  { href: "/berries", label: "Berries" },
  { href: "/collection", label: "Collection" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 text-sm font-medium">
      {LINKS.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-md bg-red-500 px-3 py-1.5 text-white"
                : "rounded-md px-3 py-1.5 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
