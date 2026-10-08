import Link from "next/link";
import { notFound } from "next/navigation";
import { readCustomBerries } from "@/lib/custom-berries";
import { getBerryDetail } from "@/lib/pokeapi-berries";

export const instant = false;

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

  try {
    const detail = await getBerryDetail(name);
    view = {
      name: detail.name,
      titleSuffix: `#${detail.id}`,
      isCustom: false,
      summary: [
        `Firmness: ${detail.firmness.name} · Size: ${detail.size} · Smoothness: ${detail.smoothness}`,
        `Growth time: ${detail.growth_time} · Max harvest: ${detail.max_harvest} · Soil dryness: ${detail.soil_dryness}`,
        `Natural gift: power ${detail.natural_gift_power ?? "—"}, type ${detail.natural_gift_type?.name ?? "—"} · Item: ${detail.item.name}`,
      ],
      flavors: detail.flavors.map((f) => ({
        name: f.flavor.name,
        potency: f.potency,
      })),
    };
  } catch {
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
