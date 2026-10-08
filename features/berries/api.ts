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
  return fetchJson<{
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number | null;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: { name: string };
    item: { name: string };
    natural_gift_type: { name: string } | null;
    flavors: { potency: number; flavor: { name: string } }[];
  }>(`/berry/${name.toLowerCase()}`);
}
