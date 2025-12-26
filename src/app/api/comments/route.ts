// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';

const commentSchema = z.object({
  content: z.string().min(1, ERROR_MESSAGES.COMMENT.REQUIRED).max(500),
  postId: z.string(),
});

/**
 * コメントを作成するAPIエンドポイント
 * 認証チェック、バリデーション、エラーハンドリングを適切に実装
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH.UNAUTHORIZED }, { status: 401 });
    }

    // データ受け取り & バリデーション
    const body = await req.json();
    const validatedFields = commentSchema.parse(body);

    // DB登録
    const comment = await prisma.comment.create({
      data: {
        content: validatedFields.content,
        postId: validatedFields.postId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(comment, { status: 201 });
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
    console.error('コメント作成エラー:', error);
    return NextResponse.json({ error: ERROR_MESSAGES.COMMENT.CREATE_FAILED }, { status: 500 });
  }
}

/**
 * コメントを削除するAPIエンドポイント
 * 認証チェック、所有権チェック、エラーハンドリングを適切に実装
 */
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH.UNAUTHORIZED }, { status: 401 });
    }

    // クエリパラメータからコメントIDを取得
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('id');
    if (!commentId) {
      return NextResponse.json({ error: ERROR_MESSAGES.COMMENT.NOT_FOUND }, { status: 400 });
    }

    // deleteManyを使うことで二つの条件を満たす場合のみ削除できる
    const result = await prisma.comment.deleteMany({
      where: {
        id: commentId,
        userId: session.user.id,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: ERROR_MESSAGES.COMMENT.NOT_OWNER }, { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // 予期しないエラーの処理
    console.error('コメント削除エラー:', error);
    return NextResponse.json({ error: ERROR_MESSAGES.COMMENT.DELETE_FAILED }, { status: 500 });
  }
}
