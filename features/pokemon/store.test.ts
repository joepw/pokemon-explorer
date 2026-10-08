import { beforeEach, describe, expect, it, vi } from "vitest";

const { files } = vi.hoisted(() => ({ files: new Map<string, string>() }));

vi.mock("fs", () => ({
  promises: {
    readFile: vi.fn(async (filePath: string) => {
      const content = files.get(filePath);
      if (content === undefined) throw new Error("ENOENT");
      return content;
    }),
    writeFile: vi.fn(async (filePath: string, content: string) => {
      files.set(filePath, content);
    }),
  },
}));

import {
  addCustomPokemon,
  customPokemonSchema,
  readCustomPokemon,
} from "./store";

const validInput = {
  name: "mychu",
  types: "electric, fairy",
  abilities: "static, lightning-rod",
  hp: "60",
  attack: "55",
  defense: "50",
};

beforeEach(() => {
  files.clear();
});

describe("customPokemonSchema", () => {
  it("accepts valid input and normalizes it", () => {
    const result = customPokemonSchema.parse(validInput);
    expect(result.name).toBe("mychu");
    expect(result.types).toEqual(["electric", "fairy"]);
    expect(result.abilities).toEqual(["static", "lightning-rod"]);
    expect(result.hp).toBe(60);
    expect(result.attack).toBe(55);
    expect(result.defense).toBe(50);
  });

  it("trims and lowercases types and abilities", () => {
    const result = customPokemonSchema.parse({
      ...validInput,
      types: " Electric , FAIRY ",
      abilities: " Static ",
    });
    expect(result.types).toEqual(["electric", "fairy"]);
    expect(result.abilities).toEqual(["static"]);
  });

  it("rejects names with invalid characters", () => {
    const result = customPokemonSchema.safeParse({
      ...validInput,
      name: "my chu!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects more than 2 types", () => {
    const result = customPokemonSchema.safeParse({
      ...validInput,
      types: "fire, water, grass",
    });
    expect(result.success).toBe(false);
  });

  it("rejects more than 4 abilities", () => {
    const result = customPokemonSchema.safeParse({
      ...validInput,
      abilities: "a, b, c, d, e",
    });
    expect(result.success).toBe(false);
  });

  it("rejects stats outside the 1-255 range", () => {
    expect(
      customPokemonSchema.safeParse({ ...validInput, hp: "0" }).success
    ).toBe(false);
    expect(
      customPokemonSchema.safeParse({ ...validInput, hp: "256" }).success
    ).toBe(false);
  });

  it("rejects non-numeric stats", () => {
    const result = customPokemonSchema.safeParse({
      ...validInput,
      hp: "not-a-number",
    });
    expect(result.success).toBe(false);
  });
});

describe("addCustomPokemon", () => {
  it("persists a valid pokemon and returns it", async () => {
    const result = await addCustomPokemon(validInput);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.pokemon.name).toBe("mychu");
    expect(result.pokemon.id).toMatch(/^custom-/);

    const stored = await readCustomPokemon();
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("mychu");
  });

  it("rejects duplicate names case-insensitively", async () => {
    await addCustomPokemon(validInput);
    const result = await addCustomPokemon({ ...validInput, name: "MyChu" });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain("already exists");

    expect(await readCustomPokemon()).toHaveLength(1);
  });

  it("rejects invalid input without writing", async () => {
    const result = await addCustomPokemon({ ...validInput, hp: "999" });

    expect(result.ok).toBe(false);
    expect(await readCustomPokemon()).toHaveLength(0);
  });

  it("returns an empty list when the data file is missing", async () => {
    expect(await readCustomPokemon()).toEqual([]);
  });
});