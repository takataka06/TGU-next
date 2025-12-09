import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { getPostsFromDb } from './repositories/postRepositories';

// 投稿一覧(ユーザー名、like数、like済みかどうかを含む)を降順で取得する関数
export async function getPosts() {
  const session = await auth();
  const userId = session?.user?.id;
  // prisma操作のロジックはrepositoryに集約
  const rawPosts = await getPostsFromDb(userId);

  return rawPosts.map((post) => ({
    ...post,
    likeCount: post._count.likes,
    likedByMe: post.likes.length > 0, // 配列チェックロジックもここに集約
  }));
}

// 渡されたidのレコードを取得しnameだけ返す関数
export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
}
