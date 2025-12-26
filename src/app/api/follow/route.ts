// app/api/follow/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';

// バリデーション: 相手のIDだけ送られてくればOK
const followSchema = z.object({
  targetUserId: z.string(),
});

/**
 * フォロー/アンフォローをトグルするAPIエンドポイント
 * 認証チェック、バリデーション、エラーハンドリングを適切に実装
 */
export async function POST(req: Request) {
  try {
    // 1. 認証チェック (誰が？)
    const session = await auth();
    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH.UNAUTHORIZED }, { status: 401 });
    }

    // 2. データ受け取り (誰を？)
    const body = await req.json();
    const { targetUserId } = followSchema.parse(body);

    // 【安全策】自分自身をフォローできないようにする
    if (currentUserId === targetUserId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.FOLLOW.CANNOT_FOLLOW_SELF },
        { status: 400 },
      );
    }

    // 3. 現状確認: 「すでにフォロー関係はあるか？」
    // schema.prismaで @@id([followerId, followingId]) としているおかげで、
    // この2つの組み合わせは世界に1つしかないことが保証されているため findUnique が使えます
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId, // 自分 (フォローする側)
          followingId: targetUserId, // 相手 (フォローされる側)
        },
      },
    });

    // 4. トグル処理 (あったら消す、なかったら作る)
    if (existingFollow) {
      // --- パターンA: すでにフォロー中なら「解除 (DELETE)」 ---
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: targetUserId,
          },
        },
      });
      // フロント側に「今はフォローしてない状態だよ」と教える
      return NextResponse.json({ isFollowing: false });
    } else {
      // --- パターンB: まだなら「登録 (CREATE)」 ---
      await prisma.follow.create({
        data: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      });
      // フロント側に「今はフォロー中だよ」と教える
      return NextResponse.json({ isFollowing: true });
    }
  } catch (error) {
    // Zodバリデーションエラーの処理
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.VALIDATION.INVALID_FORMAT,
          details: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // 予期しないエラーの処理
    console.error('フォロー操作エラー:', error);
    return NextResponse.json({ error: ERROR_MESSAGES.FOLLOW.FAILED }, { status: 500 });
  }
}
