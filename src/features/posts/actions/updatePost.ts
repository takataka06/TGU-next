'use server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { postSchema } from '../lib/postvalidation';
import { revalidatePath } from 'next/cache';
import { setFlash } from '@/lib/flash-toaster';
import { requireAuth } from '@/lib/auth-utils';
import { getOwnPost } from '../lib/ownPost';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';
import { SUCCESS_MESSAGES } from '@/lib/constants/success-messages';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

/**
 * 投稿を更新するServer Action
 * 認証チェック、所有権チェック、バリデーション、エラーハンドリングを適切に実装
 */
export async function updatePost(prevState: ActionState, formData: FormData): Promise<ActionState> {
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
    const postId = formData.get('postId') as string;

    if (!postId) {
      return {
        success: false,
        errors: { _form: [ERROR_MESSAGES.POST.NOT_FOUND] },
      };
    }

    // 投稿の存在確認と所有権チェック
    const post = await getOwnPost(authResult.userId, postId);
    if (!post) {
      return {
        success: false,
        errors: { _form: [ERROR_MESSAGES.POST.NOT_OWNER] },
      };
    }

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content });
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // DBに保存
    await prisma.post.update({
      where: { id: postId },
      data: {
        title: validationResult.data.title,
        content: validationResult.data.content,
        published: true,
      },
    });

    // フラッシュメッセージをセット（定数を使用）
    await setFlash({
      type: 'success',
      message: SUCCESS_MESSAGES.POST.UPDATED,
    });

    // 投稿一覧ページにリダイレクト
    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    // 予期しないエラーを適切に処理
    console.error('投稿更新エラー:', error);
    return {
      success: false,
      errors: { _form: [ERROR_MESSAGES.POST.UPDATE_FAILED] },
    };
  }
}
