'use server';

import { revalidatePath } from 'next/cache';
import { setFlash } from '@/lib/flash-toaster';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { SUCCESS_MESSAGES } from '@/lib/constants/success-messages';

/**
 * ログアウト処理を行うServer Action
 * エラーハンドリングを適切に実装
 */
export async function logout() {
  try {
    await signOut({ redirect: false });

    await setFlash({
      type: 'success',
      message: SUCCESS_MESSAGES.AUTH.LOGGED_OUT,
    });
    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    // ログアウトエラーは通常発生しないが、念のため処理
    console.error('ログアウトエラー:', error);
    // エラーが発生してもリダイレクトは実行
    redirect('/dashboard');
  }
}
