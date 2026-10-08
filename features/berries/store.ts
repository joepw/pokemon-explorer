import { promises as fs } from "fs";
import { z } from "zod";

export const customBerrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50)
    .regex(/^[a-z0-9-]+$/i, "Use letters, numbers, hyphens only"),
  firmness: z.string().trim().min(1, "Firmness is required").max(30),
  size: z.coerce.number().int().min(1).max(1000),
  growthTime: z.coerce.number().int().min(1).max(100),
  maxHarvest: z.coerce.number().int().min(1).max(100),
  smoothness: z.coerce.number().int().min(0).max(100),
});

export type CustomBerryInput = z.input<typeof customBerrySchema>;
export type CustomBerry = z.output<typeof customBerrySchema> & {
  id: string;
  createdAt: string;
};

const IS_VERCEL = process.env.VERCEL === "1";
const DATA_FILE = IS_VERCEL
  ? "/tmp/custom-berries.json"
  : "data/custom-berries.json";

export async function readCustomBerries(): Promise<CustomBerry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addCustomBerry(
  input: CustomBerryInput
): Promise<{ ok: true; berry: CustomBerry } | { ok: false; error: string }> {
  const parsed = customBerrySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const existing = await readCustomBerries();
  const name = parsed.data.name.toLowerCase();
  if (existing.some((b) => b.name.toLowerCase() === name)) {
    return { ok: false, error: `A custom berry named "${name}" already exists` };
  }

  const berry: CustomBerry = {
    ...parsed.data,
    name,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  await fs.writeFile(DATA_FILE, JSON.stringify([...existing, berry], null, 2));
  return { ok: true, berry };
}

export async function deleteCustomBerry(name: string): Promise<{
  ok: true;
  deleted: string;
} | { ok: false; error: string }> {
  const existing = await readCustomBerries();
  const index = existing.findIndex(
    (b) => b.name.toLowerCase() === name.toLowerCase()
  );
  if (index === -1) {
    return { ok: false, error: `No custom berry named "${name}" exists` };
  }
  const next = existing.filter(
    (b) => b.name.toLowerCase() !== name.toLowerCase()
  );
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2));
  return { ok: true, deleted: existing[index].name };
}
