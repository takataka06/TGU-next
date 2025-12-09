import { prisma } from "@/lib/prisma"; 

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: { // コメントした人の名前が必要なのでincludeで他のテーブルから取得
          select: {
            name: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }, // 新しい順
    });
    return comments;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch comments");
  }
}