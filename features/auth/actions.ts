"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();

  if (!username) {
    return
  }
  const token = crypto.randomUUID();

  const cookieStore = await cookies();
  cookieStore.set("token", token, { httpOnly: true, path: "/" });
  cookieStore.set("user", username, { path: "/" });

  const from = String(formData.get("from") ?? "/pokemon");
  redirect(from.startsWith("/") ? from : "/pokemon");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  redirect("/login");
}
