import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import { NavLinks } from "@/shared/ui/NavLinks";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pokémon Explorer",
    template: "%s · Pokémon Explorer",
  },
  description:
    "Browse Pokémon and berries, view their details, and add your own customs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight hover:opacity-80"
            >
              Pokémon Explorer
            </Link>
            <NavLinks />
          </div>
        </header>

        {children}

        <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-1 px-6 py-4 text-sm text-zinc-500">
            <span>Pokémon Explorer · Data from</span>
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              PokéAPI
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
