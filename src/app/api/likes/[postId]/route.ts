import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';

/**
 * いいねを追加するAPIエンドポイント
 * 認証チェック、エラーハンドリングを適切に実装
 */
export async function POST(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH.UNAUTHORIZED }, { status: 401 });
    }

    const { postId } = await params;

    // 投稿の存在確認
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return NextResponse.json({ error: ERROR_MESSAGES.POST.NOT_FOUND }, { status: 404 });
    }

    await prisma.like.create({
      data: { userId, postId },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Prismaの一意制約エラー（重複いいね）の処理
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      // 既にいいね済みの場合は成功として扱う（冪等性）
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.error('いいね追加エラー:', error);
    return NextResponse.json({ error: ERROR_MESSAGES.LIKE.FAILED }, { status: 500 });
  }
}

/**
 * いいねを削除するAPIエンドポイント
 * 認証チェック、エラーハンドリングを適切に実装
 */
export async function DELETE(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH.UNAUTHORIZED }, { status: 401 });
    }

    const { postId } = await params;

    await prisma.like.deleteMany({
      where: { userId, postId },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('いいね削除エラー:', error);
    return NextResponse.json({ error: ERROR_MESSAGES.LIKE.FAILED }, { status: 500 });
  }
}
