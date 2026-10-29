import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import { cookies } from "next/headers";

import { NavLinks } from "@/shared/ui/NavLinks";
import { PokeBallIcon } from "@/shared/ui/PokeBallIcon";

import "./globals.css";
import { logout } from "@/features/auth/actions";
import { CollectionProvider } from "@/features/collection/CollectionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const instant = false;

export const metadata: Metadata = {
  title: {
    default: "Pokémon Explorer",
    template: "%s · Pokémon Explorer",
  },
  description:
    "Browse Pokémon and berries, view their details, and add your own customs.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-[#f5f1e8]/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold hover:opacity-80"
            >
              <PokeBallIcon className="h-7 w-7" />
              <span>
                <span className="text-red-600">Pokémon</span>{" "}
                Explorer
              </span>
            </Link>
            <NavLinks />
            {token ? (
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-medium text-stone-700 hover:text-stone-900"
                >
                  Logout
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-stone-700 hover:text-stone-900"
              >
                Login
              </Link>
            )}
          </div>
        </header>

        <CollectionProvider>{children}</CollectionProvider>

        <footer className="mt-auto border-t border-stone-200">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-1 px-6 py-4 text-sm text-stone-500">
            <span>Pokémon Explorer · Data from</span>
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-700 underline hover:text-blue-900"
            >
              PokéAPI
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
