import { cacheLife, cacheTag } from "next/cache";
import type { ListResponse } from "@/lib/pokeapi";

const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`PokéAPI ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getPokemonPage(offset: number, limit: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("pokemon-list");
  return fetchJson<ListResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
}

export async function getAllPokemonNames() {
  "use cache";
  cacheLife("days");
  cacheTag("pokemon-list");
  const data = await fetchJson<ListResponse>("/pokemon?limit=100000");
  return data.results;
}

export async function getPokemonDetail(name: string) {
  "use cache";
  cacheLife("days");
  cacheTag("pokemon-list", `pokemon-${name.toLowerCase()}`);
  return fetchJson<{
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: { front_default: string | null };
    types: { slot: number; type: { name: string } }[];
    abilities: { ability: { name: string }; is_hidden: boolean }[];
    stats: { base_stat: number; stat: { name: string } }[];
  }>(`/pokemon/${name.toLowerCase()}`);
}
