import type { ListItem } from "@/lib/pokeapi";

const KEY = "collection";

export function getCollection(): ListItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as ListItem[];
  } catch {
    return [];
  }
}

export function addToCollection(item: ListItem) {
  const current = getCollection();
  if (current.some((p) => p.name === item.name)) return current;
  const next = [...current, item];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("collection:changed"));
  return next;
}

export function removeFromCollection(name: string) {
  const next = getCollection().filter((p) => p.name !== name);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("collection:changed"));
  return next;
}
