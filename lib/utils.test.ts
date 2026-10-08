import { describe, expect, it } from "vitest";

import { idFromResourceUrl } from "./utils";

describe("idFromResourceUrl", () => {
  it("extracts the id from a pokemon resource url", () => {
    expect(idFromResourceUrl("https://pokeapi.co/api/v2/pokemon/1/")).toBe(1);
    expect(idFromResourceUrl("https://pokeapi.co/api/v2/pokemon/1025")).toBe(
      1025
    );
  });

  it("extracts the id from a berry resource url", () => {
    expect(idFromResourceUrl("https://pokeapi.co/api/v2/berry/12/")).toBe(12);
  });

  it("returns null for urls without a trailing numeric segment", () => {
    expect(idFromResourceUrl("")).toBeNull();
    expect(idFromResourceUrl("https://pokeapi.co/api/v2/")).toBeNull();
    expect(idFromResourceUrl("https://example.com/items/sword")).toBeNull();
  });
});