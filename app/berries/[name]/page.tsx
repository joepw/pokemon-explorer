import Link from "next/link";

type BerryFlavor = {
  potency: number;
  flavor: { name: string; url: string };
};

type BerryDetail = {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number | null;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: { name: string; url: string };
  item: { name: string; url: string };
  natural_gift_type: { name: string; url: string } | null;
  flavors: BerryFlavor[];
};

export default async function BerryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const res = await fetch(`https://pokeapi.co/api/v2/berry/${name}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch berry "${name}": ${res.status}`);
  }

  const b: BerryDetail = await res.json();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link href="/berries" className="text-sm underline">
        ← Back to Berries
      </Link>

      <h1 className="mt-4 text-3xl font-bold capitalize">
        {b.name} <span className="text-zinc-500">#{b.id}</span>
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        Firmness: <span className="capitalize">{b.firmness.name}</span> · Size:{" "}
        {b.size} · Smoothness: {b.smoothness}
      </p>
      <p className="mt-1 text-sm text-zinc-600">
        Growth time: {b.growth_time} · Max harvest: {b.max_harvest} · Soil
        dryness: {b.soil_dryness}
      </p>
      <p className="mt-1 text-sm text-zinc-600">
        Natural gift: power {b.natural_gift_power ?? "—"}, type{" "}
        <span className="capitalize">{b.natural_gift_type?.name ?? "—"}</span>{" "}
        · Item: <span className="capitalize">{b.item.name}</span>
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Flavors</h2>
        <ul className="mt-2 list-disc pl-6">
          {b.flavors.map((f) => (
            <li key={f.flavor.name}>
              {f.flavor.name}: {f.potency}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
