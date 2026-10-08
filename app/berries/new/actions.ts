import { redirect } from "next/navigation";
import { addCustomBerry } from "@/features/berries/store";

export async function createCustomBerry(formData: FormData) {
  "use server";

  const result = await addCustomBerry({
    name: String(formData.get("name") ?? ""),
    firmness: String(formData.get("firmness") ?? ""),
    size: String(formData.get("size") ?? ""),
    growthTime: String(formData.get("growthTime") ?? ""),
    maxHarvest: String(formData.get("maxHarvest") ?? ""),
    smoothness: String(formData.get("smoothness") ?? ""),
  });

  if (!result.ok) {
    redirect(`/berries/new?error=${encodeURIComponent(result.error)}`);
  }

  redirect(`/berries?q=${encodeURIComponent(result.berry.name)}`);
}
