import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// 投稿一覧(ユーザー名、like数、like済みかどうかを含む)を降順で取得する関数
export async function getPosts(){
  const session = await auth();
  const userId = session?.user?.id;
  return await prisma.post.findMany({
    where: { published:true},
    include: { author: {
      select: {name:true},
    },
    _count: {
      select: { likes: true}
    }, 
    likes: userId
    ? { where: { userId }}
    : false,
    },
    orderBy: { createdAt: "desc" },
    }).then((posts => 
      posts.map((post => ({
        ...post,
        likeCount: post._count.likes,
        likedByMe:post.likes.length > 0,
      }))
    )));
}

// 渡されたidのレコードを取得しnameだけ返す関数
export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: {id},
    include: {
      author: {
        select: {name: true}
      }
    }
  })
}