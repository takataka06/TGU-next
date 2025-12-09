// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // auth.jsの設定パスに合わせて
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const commentSchema = z.object({
  content: z.string().min(1, 'コメントを入力してください').max(500),
  postId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // データ受け取り & バリデーション
    const body = await req.json();
    const validatedFields = commentSchema.parse(body);

    // 3. DB登録
    const comment = await prisma.comment.create({
      data: {
        content: validatedFields.content,
        postId: validatedFields.postId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
