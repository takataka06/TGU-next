import { prisma } from '@/lib/prisma';

export async function getPostsFromDb(currentUserId?: string) {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
      _count: {
        select: { likes: true },
      },
      // userIdがある時だけ、そのユーザーのいいね情報を取得
      likes: currentUserId ? { where: { userId: currentUserId } } : false,
    },
    orderBy: { createdAt: 'desc' },
  });
}
