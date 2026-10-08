import Link from "next/link";
import { notFound } from "next/navigation";
import { readCustomBerries } from "@/lib/custom-berries";

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

type DetailView = {
  name: string;
  titleSuffix: string;
  isCustom: boolean;
  summary: string[];
  flavors: { name: string; potency: number | string }[];
};

export default async function BerryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  let view: DetailView | null = null;

  const res = await fetch(`https://pokeapi.co/api/v2/berry/${name}`);

  if (res.ok) {
    const b: BerryDetail = await res.json();
    view = {
      name: b.name,
      titleSuffix: `#${b.id}`,
      isCustom: false,
      summary: [
        `Firmness: ${b.firmness.name} · Size: ${b.size} · Smoothness: ${b.smoothness}`,
        `Growth time: ${b.growth_time} · Max harvest: ${b.max_harvest} · Soil dryness: ${b.soil_dryness}`,
        `Natural gift: power ${b.natural_gift_power ?? "—"}, type ${b.natural_gift_type?.name ?? "—"} · Item: ${b.item.name}`,
      ],
      flavors: b.flavors.map((f) => ({
        name: f.flavor.name,
        potency: f.potency,
      })),
    };
  } else {
    const customs = await readCustomBerries();
    const custom = customs.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (custom) {
      view = {
        name: custom.name,
        titleSuffix: "",
        isCustom: true,
        summary: [
          `Firmness: ${custom.firmness} · Size: ${custom.size} · Smoothness: ${custom.smoothness}`,
          `Growth time: ${custom.growthTime} · Max harvest: ${custom.maxHarvest}`,
        ],
        flavors: [],
      };
    }
  }

  if (!view) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link href="/berries" className="text-sm underline">
        ← Back to Berries
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

      {view.summary.map((line) => (
        <p key={line} className="mt-2 text-sm text-zinc-600 capitalize">
          {line}
        </p>
      ))}

      {view.flavors.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Flavors</h2>
          <ul className="mt-2 list-disc pl-6">
            {view.flavors.map((f) => (
              <li key={f.name}>
                {f.name}: {f.potency}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
