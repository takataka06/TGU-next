// app/api/follow/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// バリデーション: 相手のIDだけ送られてくればOK
const followSchema = z.object({
  targetUserId: z.string(),
});

export async function POST(req: Request) {
  try {
    // 1. 認証チェック (誰が？)
    const session = await auth();
    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. データ受け取り (誰を？)
    const body = await req.json();
    const { targetUserId } = followSchema.parse(body);

    // 【安全策】自分自身をフォローできないようにする
    if (currentUserId === targetUserId) {
      return NextResponse.json({ error: "自分はフォローできません" }, { status: 400 });
    }

    // 3. 現状確認: 「すでにフォロー関係はあるか？」
    // schema.prismaで @@id([followerId, followingId]) としているおかげで、
    // この2つの組み合わせは世界に1つしかないことが保証されているため findUnique が使えます
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,   // 自分 (フォローする側)
          followingId: targetUserId,   // 相手 (フォローされる側)
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
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}