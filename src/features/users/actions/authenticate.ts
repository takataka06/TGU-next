'use server';

import { signIn } from '@/auth';
import { setFlash } from '@/lib/flash-toaster';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';
import { SUCCESS_MESSAGES } from '@/lib/constants/success-messages';

/**
 * ユーザー認証を行うServer Action
 * 認証エラーの適切な処理とエラーメッセージの一元管理
 */
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      // フォームの値を JavaScript の普通のオブジェクトに変換して渡す
      ...Object.fromEntries(formData),
      redirect: false,
    });
    // フラッシュメッセージをセット（定数を使用）
    await setFlash({
      type: 'success',
      message: SUCCESS_MESSAGES.AUTH.LOGGED_IN,
    });
    // /dashboard の RSC 再レンダリング
    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      // エラーが認証エラーの場合、適切なメッセージを返す（定数を使用）
      switch (error.type) {
        case 'CredentialsSignin':
          return ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS;
        default:
          return ERROR_MESSAGES.SERVER.INTERNAL_ERROR;
      }
    }
    // 予期しないエラーは再スロー（Next.jsのエラーハンドリングに委ねる）
    throw error;
  }
}

// ログイン処理を実行するサーバーアクション
