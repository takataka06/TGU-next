'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { setFlash } from '@/lib/flash-toaster';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth-utils';
import { getOwnPost } from '../lib/ownPost';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';
import { SUCCESS_MESSAGES } from '@/lib/constants/success-messages';

/**
 * 投稿を削除するServer Action
 * 認証チェック、所有権チェック、エラーハンドリングを適切に実装
 */
export async function deletePost(postId: string) {
  try {
    // 認証チェック（共通ユーティリティを使用）
    const authResult = await requireAuth();
    if (!authResult.success || !authResult.userId) {
      await setFlash({
        type: 'error',
        message: authResult.error || ERROR_MESSAGES.AUTH.REQUIRED,
      });
      redirect('/dashboard');
      return;
    }

    // 投稿の存在確認と所有権チェック
    const post = await getOwnPost(authResult.userId, postId);
    if (!post) {
      await setFlash({
        type: 'error',
        message: ERROR_MESSAGES.POST.NOT_OWNER,
      });
      redirect('/dashboard');
      return;
    }

    // DBから削除
    await prisma.post.delete({
      where: { id: postId },
    });

    // フラッシュメッセージをセット（定数を使用）
    await setFlash({
      type: 'success',
      message: SUCCESS_MESSAGES.POST.DELETED,
    });

    // /dashboard の RSC 再レンダリング
    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    // 予期しないエラーを適切に処理
    console.error('投稿削除エラー:', error);
    await setFlash({
      type: 'error',
      message: ERROR_MESSAGES.POST.DELETE_FAILED,
    });
    redirect('/dashboard');
  }
}
