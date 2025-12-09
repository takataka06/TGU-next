import { prisma } from '@/lib/prisma';

export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}
