import Image from "next/image";
import Link from "next/link";

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

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon "${name}": ${res.status}`);
  }

  const p: PokemonDetail = await res.json();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link href="/pokemon" className="text-sm underline">
        ← Back to Pokémon
      </Link>

      <h1 className="mt-4 text-3xl font-bold capitalize">
        {p.name} <span className="text-zinc-500">#{p.id}</span>
      </h1>

      {p.sprites.front_default && (
        <Image
          src={p.sprites.front_default}
          alt={p.name}
          width={120}
          height={120}
        />
      )}

      <p className="mt-2 text-sm text-zinc-600">
        Height: {p.height} · Weight: {p.weight}
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Types</h2>
        <ul className="mt-2 list-disc pl-6">
          {p.types.map((t) => (
            <li key={t.type.name} className="capitalize">
              {t.type.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Abilities</h2>
        <ul className="mt-2 list-disc pl-6">
          {p.abilities.map((a) => (
            <li key={a.ability.name} className="capitalize">
              {a.ability.name}
              {a.is_hidden ? " (hidden)" : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Base stats</h2>
        <ul className="mt-2 list-disc pl-6">
          {p.stats.map((s) => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
