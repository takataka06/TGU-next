import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// 特定のユーザー(targetUserId)を、自分がフォローしているか調べる関数
export async function getIsFollowing(targetUserId: string) {
  const session = await auth();
  const currentUserId = session?.user?.id;

  // ログインしてないなら、フォローしてるわけがないので false
  if (!currentUserId) return false;

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  // レコードが見つかれば true (フォロー中)、なければ false
  return !!follow;
}
