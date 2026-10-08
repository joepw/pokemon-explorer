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
  addCustomBerry,
  customBerrySchema,
  readCustomBerries,
} from "./store";

const validInput = {
  name: "myberry",
  firmness: "soft",
  size: "20",
  growthTime: "3",
  maxHarvest: "5",
  smoothness: "25",
};

beforeEach(() => {
  files.clear();
});

describe("customBerrySchema", () => {
  it("accepts valid input and coerces numbers", () => {
    const result = customBerrySchema.parse(validInput);
    expect(result.name).toBe("myberry");
    expect(result.firmness).toBe("soft");
    expect(result.size).toBe(20);
    expect(result.growthTime).toBe(3);
    expect(result.maxHarvest).toBe(5);
    expect(result.smoothness).toBe(25);
  });

  it("rejects an empty firmness", () => {
    const result = customBerrySchema.safeParse({ ...validInput, firmness: "" });
    expect(result.success).toBe(false);
  });

  it("rejects smoothness outside 0-100", () => {
    expect(
      customBerrySchema.safeParse({ ...validInput, smoothness: "-1" }).success
    ).toBe(false);
    expect(
      customBerrySchema.safeParse({ ...validInput, smoothness: "101" }).success
    ).toBe(false);
  });

  it("rejects names with invalid characters", () => {
    const result = customBerrySchema.safeParse({ ...validInput, name: "x y" });
    expect(result.success).toBe(false);
  });
});

describe("addCustomBerry", () => {
  it("persists a valid berry and returns it", async () => {
    const result = await addCustomBerry(validInput);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.berry.name).toBe("myberry");
    expect(result.berry.id).toMatch(/^custom-/);

    const stored = await readCustomBerries();
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("myberry");
  });

  it("rejects duplicate names case-insensitively", async () => {
    await addCustomBerry(validInput);
    const result = await addCustomBerry({ ...validInput, name: "MyBerry" });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain("already exists");
  });

  it("rejects invalid input without writing", async () => {
    const result = await addCustomBerry({ ...validInput, size: "0" });

    expect(result.ok).toBe(false);
    expect(await readCustomBerries()).toHaveLength(0);
  });
});