"use client";

import { ListItem } from "@/lib/pokeapi";
import { idFromResourceUrl } from "@/lib/utils";
import { Sprite } from "@/shared/ui/Sprite";
import React from "react";
import Link from "next/link";
import { useCollection } from "@/features/collection/CollectionProvider";

const PokemonCard = ({
  item,
  enableCatch,
  href,
  enableRelease,
}: {
  item: ListItem;
  enableCatch?: boolean;
  href?: string;
  enableRelease?: boolean;
}) => {
  const { add, remove } = useCollection();

  const id = item.url ? idFromResourceUrl(item.url) : null;
  const tile = (
    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-stone-100 text-3xl font-bold text-stone-500">
      {item.name.charAt(0).toUpperCase()}
    </div>
  );
  const isCustom = item.url === "";

  const catchPokemon = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(item);
  };

  const content = (
    <>
      {id !== null ? (
        <Sprite
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={item.name}
          width={96}
          height={96}
          fallback={tile}
        />
      ) : (
        tile
      )}
      <span className="mt-2 flex flex-wrap items-center justify-center gap-1 text-sm font-medium capitalize">
        {item.name}
        {isCustom && (
          <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-normal text-amber-800">
            custom
          </span>
        )}
      </span>
      <span className="text-xs text-stone-500">#{id}</span>
      {enableCatch && (
        <button
          className="mt-2 rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
          onClick={catchPokemon}
        >
          Catch
        </button>
      )}
      {enableRelease && (
        <button
          className="mt-2 rounded-md bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-700"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            remove(item.name);
          }}
        >
          Release
        </button>
      )}
    </>
  );

  const cardClass =
    "flex h-full flex-col items-center rounded-lg border border-stone-200 bg-[#fffdf7] p-4 text-center transition hover:border-blue-400 hover:shadow-sm";

  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    );
  }

  return <div className={cardClass}>{content}</div>;
};

export default PokemonCard;
