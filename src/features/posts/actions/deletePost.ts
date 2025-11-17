"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { setFlash } from "@/lib/flash-toaster";
import { redirect } from "next/navigation";



export async function deletePost(postId:string){
  // DBから削除
  await prisma.post.delete({
    where: {id: postId}
  })

  // 投稿一覧ページにリダイレクト
  
  await setFlash({
    type: "success",
    message: "投稿を削除しました。",
  });

  // /dashboard の RSC 再レンダリング
  revalidatePath("/dashboard");
  redirect("/dashboard");
}