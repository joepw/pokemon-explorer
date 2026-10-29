"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ListItem } from "@/lib/pokeapi";
import { getCollection, addToCollection as add, removeFromCollection as remove } from "@/features/collection/storage";

type Ctx = {
  items: ListItem[];
  add: (item: ListItem) => void;
  remove: (name: string) => void;
};

const CollectionContext = createContext<Ctx | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ListItem[]>(() => getCollection());

  const value: Ctx = {
    items,
    add: (item) => setItems(add(item)),
    remove: (name) => setItems(remove(name)),
  };

  return (
    <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
  );
}

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error("useCollection must be used within CollectionProvider");
  return ctx;
}
