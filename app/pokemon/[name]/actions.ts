"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteCustomPokemon } from "@/features/pokemon/store";

export async function deleteCustomPokemonAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const result = await deleteCustomPokemon(name);
  if (!result.ok) return;
  revalidatePath("/pokemon");
  redirect("/pokemon");
}
