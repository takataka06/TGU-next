"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { postSchema } from "../lib/postvalidation";

type ActionState = {
  success: boolean,
  errors: Record<string, string[]>,
}

export async function updatePost(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // フォームから送信されたデータを取得
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  //　バリデーション
  // safeParse関数はvalidationResultがあるならsuccessにtrueを返す
  const validationResult = postSchema.safeParse({ title, content});
  if (!validationResult.success) {
    return {
      success: false, errors: validationResult.error.flatten().fieldErrors
    }
  }

  // DBに保存
  await prisma.post.update({
    where: {id: postId},
    data: {
      title,
      content,
      published: true,
    }
  })



  // 投稿一覧ページにリダイレクト
  redirect("/dashboard");
  

}