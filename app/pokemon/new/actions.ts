import { redirect } from "next/navigation";
import { addCustomPokemon } from "@/features/pokemon/store";

export async function createCustomPokemon(formData: FormData) {
  "use server";

  const result = await addCustomPokemon({
    name: String(formData.get("name") ?? ""),
    types: String(formData.get("types") ?? ""),
    abilities: String(formData.get("abilities") ?? ""),
    hp: String(formData.get("hp") ?? ""),
    attack: String(formData.get("attack") ?? ""),
    defense: String(formData.get("defense") ?? ""),
  });

  if (!result.ok) {
    redirect(`/pokemon/new?error=${encodeURIComponent(result.error)}`);
  }

  redirect(`/pokemon?q=${encodeURIComponent(result.pokemon.name)}`);
}
