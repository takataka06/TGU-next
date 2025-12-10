import { prisma } from '@/lib/prisma';

export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}

export async function getOwnPosts(userId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
