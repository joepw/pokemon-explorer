import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readCustomPokemon } from "@/lib/custom-pokemon";

type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

type PokemonAbility = {
  ability: { name: string; url: string };
  is_hidden: boolean;
};

type PokemonStat = {
  base_stat: number;
  stat: { name: string; url: string };
};

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
};

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

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  let view: DetailView | null = null;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (res.ok) {
    const p: PokemonDetail = await res.json();
    view = {
      name: p.name,
      titleSuffix: `#${p.id}`,
      isCustom: false,
      image: p.sprites.front_default,
      meta: `Height: ${p.height} · Weight: ${p.weight}`,
      types: p.types.map((t) => t.type.name),
      abilities: p.abilities.map((a) => ({
        name: a.ability.name,
        hidden: a.is_hidden,
      })),
      stats: p.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
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
      <Link href="/pokemon" className="text-sm underline">
        ← Back to Pokémon
      </Link>

      <h1 className="mt-4 text-3xl font-bold capitalize">
        {view.name}{" "}
        {view.isCustom ? (
          <span className="rounded bg-zinc-200 px-2 py-0.5 align-middle text-sm font-medium text-zinc-700">
            custom
          </span>
        ) : (
          <span className="text-zinc-500">{view.titleSuffix}</span>
        )}
      </h1>

      {view.image && (
        <Image src={view.image} alt={view.name} width={120} height={120} />
      )}

      {view.meta && <p className="mt-2 text-sm text-zinc-600">{view.meta}</p>}

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Types</h2>
        <ul className="mt-2 list-disc pl-6">
          {view.types.map((t) => (
            <li key={t} className="capitalize">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Abilities</h2>
        <ul className="mt-2 list-disc pl-6">
          {view.abilities.map((a) => (
            <li key={a.name} className="capitalize">
              {a.name}
              {a.hidden ? " (hidden)" : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Base stats</h2>
        <ul className="mt-2 list-disc pl-6">
          {view.stats.map((s) => (
            <li key={s.name}>
              {s.name}: {s.value}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
