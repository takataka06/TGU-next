"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";



export async function deletePost(postId:string){
  // DBから削除
  await prisma.post.delete({
    where: {id: postId}
  })

  // 投稿一覧ページにリダイレクト
  redirect("/dashboard");
}