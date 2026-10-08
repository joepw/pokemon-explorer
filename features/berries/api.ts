import { cacheLife, cacheTag } from "next/cache";
import type { ListResponse } from "@/lib/pokeapi";

const BASE_URL = "https://pokeapi.co/api/v2";
const SPRITE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

export function getBerrySpriteUrl(name: string): string {
  return `${SPRITE_BASE_URL}/${name}-berry.png`;
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`PokéAPI ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// null on 404 so callers can fall back to the custom store
async function fetchJsonOrNull<T>(path: string): Promise<T | null> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`PokéAPI ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getBerryPage(offset: number, limit: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("berry-list");
  return fetchJson<ListResponse>(`/berry?offset=${offset}&limit=${limit}`);
}

export async function getAllBerryNames() {
  "use cache";
  cacheLife("days");
  cacheTag("berry-list");
  const data = await fetchJson<ListResponse>("/berry?limit=100000");
  return data.results;
}

export async function getBerryDetail(name: string) {
  "use cache";
  cacheLife("days");
  cacheTag("berry-list", `berry-${name.toLowerCase()}`);
  return fetchJsonOrNull<{
    id: number;
    name: string;
    growth_time: number | null;
    max_harvest: number | null;
    natural_gift_power: number | null;
    size: number | null;
    smoothness: number | null;
    soil_dryness: number | null;
    firmness: { name: string } | null;
    item: { name: string };
    natural_gift_type: { name: string } | null;
    flavors: { potency: number; flavor: { name: string } }[];
  }>(`/berry/${name.toLowerCase()}`);
}
