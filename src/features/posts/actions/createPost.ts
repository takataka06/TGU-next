'use server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { postSchema } from '../lib/postvalidation';
import { requireAuth } from '@/lib/auth-utils';
import { setFlash } from '@/lib/flash-toaster';
import { revalidatePath } from 'next/cache';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';
import { SUCCESS_MESSAGES } from '@/lib/constants/success-messages';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

/**
 * 新規投稿を作成するServer Action
 * 認証チェック、バリデーション、エラーハンドリングを適切に実装
 */
export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    // 認証チェック（共通ユーティリティを使用）
    const authResult = await requireAuth();
    if (!authResult.success || !authResult.userId) {
      return {
        success: false,
        errors: { _form: [authResult.error || ERROR_MESSAGES.AUTH.REQUIRED] },
      };
    }

    // フォームから送信されたデータを取得
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content });
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // DBに保存
    await prisma.post.create({
      data: {
        title: validationResult.data.title,
        content: validationResult.data.content,
        published: true,
        authorId: authResult.userId,
      },
    });

    // フラッシュメッセージをセット（定数を使用）
    await setFlash({
      type: 'success',
      message: SUCCESS_MESSAGES.POST.CREATED,
    });

    // 投稿一覧ページにリダイレクト
    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    // 予期しないエラーを適切に処理
    console.error('投稿作成エラー:', error);
    return {
      success: false,
      errors: { _form: [ERROR_MESSAGES.POST.CREATE_FAILED] },
    };
  }
}
