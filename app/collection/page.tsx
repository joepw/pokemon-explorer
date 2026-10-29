"use client";

import { useEffect, useState } from "react";

import PokemonCard from "../pokemon/pokemonCard";
import { ListItem } from "@/lib/pokeapi";
import { getCollection } from "@/features/collection/storage";

export default function CollectionPage() {
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const load = () => setItems(getCollection());
    load();
    window.addEventListener("collection:changed", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("collection:changed", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">My Collection</h1>
      <p className="mt-2 text-sm text-stone-500">
        Demo: collection is stored in this browser (shared across users).
      </p>
      {items.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed px-6 py-12 text-center text-stone-600">
          No Pokémon caught yet.
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard
                item={pokemon}
                href={`/pokemon/${pokemon.name}`}
                enableRelease
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
