"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { postSchema } from "../lib/postvalidation";
import { auth } from "@/auth";
import { setFlash } from "@/lib/flash-toaster";
import { revalidatePath } from "next/cache";

type ActionState = {
  success: boolean,
  errors: Record<string, string[]>,
}

export async function createPost(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // フォームから送信されたデータを取得
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  //　バリデーション
  // safeParse関数はvalidationResultがあるならsuccessにtrueを返す
  const validationResult = postSchema.safeParse({ title, content });
  if (!validationResult.success) {
    return {
      success: false, errors: validationResult.error.flatten().fieldErrors
    }
  }

  // DBに保存
  const session = await auth();
  const userId = session?.user?.id
  if (!userId) {
    throw new Error("ログインが必要です");
  }
  await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      authorId: userId // userIdはセッションから取得する
    }
  })


  await setFlash({
    type: "success",
    message: "新規投稿に成功しました。",
  });
  // 投稿一覧ページにリダイレクト
  revalidatePath("/dashboard");
  redirect("/dashboard");

}