import Link from "next/link";
import { notFound } from "next/navigation";
import { readCustomPokemon } from "@/features/pokemon/store";
import { getPokemonDetail } from "@/features/pokemon/api";
import { Sprite } from "@/shared/ui/Sprite";

export const instant = false;

type DetailView = {
  name: string;
  titleSuffix: string;
  isCustom: boolean;
  image: string | null;
  meta: string | null;
  types: string[];
  abilities: { name: string; hidden: boolean }[];
  stats: { name: string; value: number }[];
};

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-zinc-400 text-white",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-yellow-950",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-cyan-950",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-violet-600 text-white",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-zinc-700 text-white",
  steel: "bg-slate-500 text-white",
  fairy: "bg-pink-300 text-pink-950",
};

function statBarColor(value: number) {
  if (value >= 100) return "bg-emerald-500";
  if (value >= 70) return "bg-amber-500";
  if (value >= 45) return "bg-orange-500";
  return "bg-red-500";
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  let view: DetailView | null = null;

  const detail = await getPokemonDetail(name);

  if (detail) {
    view = {
      name: detail.name,
      titleSuffix: `#${detail.id}`,
      isCustom: false,
      image: detail.sprites.front_default,
      meta: `Height: ${detail.height} · Weight: ${detail.weight}`,
      types: detail.types.map((t) => t.type.name),
      abilities: detail.abilities.map((a) => ({
        name: a.ability.name,
        hidden: a.is_hidden,
      })),
      stats: detail.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    };
  } else {
    const customs = await readCustomPokemon();
    const custom = customs.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (custom) {
      view = {
        name: custom.name,
        titleSuffix: "",
        isCustom: true,
        image: null,
        meta: null,
        types: custom.types,
        abilities: custom.abilities.map((a) => ({ name: a, hidden: false })),
        stats: [
          { name: "hp", value: custom.hp },
          { name: "attack", value: custom.attack },
          { name: "defense", value: custom.defense },
        ],
      };
    }
  }

  if (!view) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/pokemon"
        className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back to Pokémon
      </Link>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
        {view.image && (
          <div className="self-start rounded-xl border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <Sprite
              src={view.image}
              alt={view.name}
              width={160}
              height={160}
              fallback={
                <div className="flex h-40 w-40 items-center justify-center text-4xl font-bold text-zinc-500">
                  {view.name.charAt(0).toUpperCase()}
                </div>
              }
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="flex flex-wrap items-center gap-2 text-3xl font-bold capitalize">
            {view.name}
            {view.isCustom ? (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                custom
              </span>
            ) : (
              <span className="text-lg font-normal text-zinc-500">
                {view.titleSuffix}
              </span>
            )}
          </h1>

          <ul className="mt-3 flex flex-wrap gap-2">
            {view.types.map((type) => (
              <li
                key={type}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  TYPE_COLORS[type] ?? "bg-zinc-500 text-white"
                }`}
              >
                {type}
              </li>
            ))}
          </ul>

          {view.meta && (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {view.meta}
            </p>
          )}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Abilities</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {view.abilities.map((ability) => (
            <li
              key={ability.name}
              className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm capitalize dark:border-zinc-700"
            >
              {ability.name}
              {ability.hidden && (
                <span className="ml-1 text-xs text-zinc-500">(hidden)</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Base stats</h2>
        <ul className="mt-3 space-y-2">
          {view.stats.map((stat) => (
            <li key={stat.name} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 capitalize text-zinc-600 dark:text-zinc-400">
                {stat.name}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className={`h-full rounded-full ${statBarColor(stat.value)}`}
                  style={{
                    width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-xs">
                {stat.value}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
