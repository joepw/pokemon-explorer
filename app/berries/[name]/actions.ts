"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteCustomBerry } from "@/features/berries/store";

export async function deleteCustomBerryAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const result = await deleteCustomBerry(name);
  if (!result.ok) return;
  revalidatePath("/berries");
  redirect("/berries");
}
