import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

export const customPokemonSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50)
    .regex(/^[a-z0-9-]+$/i, "Use letters, numbers, hyphens only"),
  types: z
    .string()
    .trim()
    .min(1, "At least one type is required")
    .transform((s) =>
      s
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
    )
    .pipe(z.array(z.string().min(1)).min(1).max(2)),
  abilities: z
    .string()
    .trim()
    .min(1, "At least one ability is required")
    .transform((s) =>
      s
        .split(",")
        .map((a) => a.trim().toLowerCase())
        .filter(Boolean)
    )
    .pipe(z.array(z.string().min(1)).min(1).max(4)),
  hp: z.coerce.number().int().min(1).max(255),
  attack: z.coerce.number().int().min(1).max(255),
  defense: z.coerce.number().int().min(1).max(255),
});

export type CustomPokemonInput = z.input<typeof customPokemonSchema>;
export type CustomPokemon = z.output<typeof customPokemonSchema> & {
  id: string;
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "custom-pokemon.json");

export async function readCustomPokemon(): Promise<CustomPokemon[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addCustomPokemon(
  input: CustomPokemonInput
): Promise<{ ok: true; pokemon: CustomPokemon } | { ok: false; error: string }> {
  const parsed = customPokemonSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const existing = await readCustomPokemon();
  const name = parsed.data.name.toLowerCase();
  if (existing.some((p) => p.name.toLowerCase() === name)) {
    return { ok: false, error: `A custom Pokémon named "${name}" already exists` };
  }

  const pokemon: CustomPokemon = {
    ...parsed.data,
    name,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  await fs.writeFile(DATA_FILE, JSON.stringify([...existing, pokemon], null, 2));
  return { ok: true, pokemon };
}
