"use server";

import { revalidatePath } from "next/cache";
import { setFlash } from "@/lib/flash-toaster";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await signOut({ redirect: false });

  await setFlash({
    type: "success",
    message: "ログアウトしました。",
  });
  console.log("Logged out"); // デバッグ用ログ
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
