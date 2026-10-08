import Link from "next/link";
import { notFound } from "next/navigation";
import { readCustomBerries } from "@/features/berries/store";
import {
  getBerryDetail,
  getBerrySpriteUrl,
} from "@/features/berries/api";
import { Sprite } from "@/shared/ui/Sprite";

// dynamic: reads :name params
export const instant = false;

type DetailView = {
  name: string;
  titleSuffix: string;
  isCustom: boolean;
  image: string | null;
  facts: { label: string; value: string }[];
  flavors: { name: string; potency: number }[];
};

const FLAVOR_COLORS: Record<string, string> = {
  spicy: "bg-red-500",
  dry: "bg-blue-500",
  sweet: "bg-pink-400",
  bitter: "bg-green-500",
  sour: "bg-yellow-400",
};

export default async function BerryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  let view: DetailView | null = null;

  const detail = await getBerryDetail(name);

  if (detail) {
    view = {
      name: detail.name,
      titleSuffix: `#${detail.id}`,
      isCustom: false,
      image: getBerrySpriteUrl(detail.name),
      facts: [
        { label: "Firmness", value: detail.firmness?.name ?? "—" },
        { label: "Size", value: String(detail.size ?? "—") },
        { label: "Smoothness", value: String(detail.smoothness ?? "—") },
        { label: "Growth time", value: String(detail.growth_time ?? "—") },
        { label: "Max harvest", value: String(detail.max_harvest ?? "—") },
        { label: "Soil dryness", value: String(detail.soil_dryness ?? "—") },
        {
          label: "Natural gift",
          value: detail.natural_gift_type
            ? `${detail.natural_gift_type.name}, ${detail.natural_gift_power ?? "—"}`
            : "—",
        },
        { label: "Item", value: detail.item.name },
      ],
      flavors: detail.flavors.map((f) => ({
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
        image: null,
        facts: [
          { label: "Firmness", value: custom.firmness },
          { label: "Size", value: String(custom.size) },
          { label: "Smoothness", value: String(custom.smoothness) },
          { label: "Growth time", value: String(custom.growthTime) },
          { label: "Max harvest", value: String(custom.maxHarvest) },
        ],
        flavors: [],
      };
    }
  }

  if (!view) {
    notFound();
  }

  const tile = (
    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-rose-100 text-3xl font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
      {view.name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/berries"
        className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back to Berries
      </Link>

      <div className="mt-4 flex items-center gap-4">
        {view.image ? (
          <Sprite
            src={view.image}
            alt={view.name}
            width={96}
            height={96}
            fallback={tile}
          />
        ) : (
          tile
        )}

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
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {view.facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
          >
            <dt className="text-xs uppercase tracking-wide text-zinc-500">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-medium capitalize">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {view.flavors.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Flavors</h2>
          <ul className="mt-3 space-y-2">
            {view.flavors.map((flavor) => (
              <li key={flavor.name} className="flex items-center gap-3 text-sm">
                <span className="w-20 shrink-0 capitalize text-zinc-600 dark:text-zinc-400">
                  {flavor.name}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className={`h-full rounded-full ${
                      FLAVOR_COLORS[flavor.name] ?? "bg-zinc-500"
                    }`}
                    style={{
                      width: `${Math.min(100, (flavor.potency / 25) * 100)}%`,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-xs">
                  {flavor.potency}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
