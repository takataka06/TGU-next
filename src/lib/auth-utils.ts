import { auth } from '@/auth';
import { ERROR_MESSAGES } from './constants/error-messages';

/**
 * 認証チェック用の共通ユーティリティ
 * DRY原則に従い、認証チェックロジックを一元化することで保守性とセキュリティを向上
 */

export interface AuthResult {
  success: boolean;
  userId?: string;
  error?: string;
}

/**
 * 現在のセッションからユーザーIDを取得
 * 認証されていない場合はエラーを返す
 *
 * @returns 認証成功時はuserIdを含むオブジェクト、失敗時はエラーメッセージを含むオブジェクト
 */
export async function requireAuth(): Promise<AuthResult> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return {
        success: false,
        error: ERROR_MESSAGES.AUTH.REQUIRED,
      };
    }

    return {
      success: true,
      userId,
    };
  } catch (error) {
    return {
      success: false,
      error: ERROR_MESSAGES.SERVER.INTERNAL_ERROR,
    };
  }
}

/**
 * 現在のセッションからユーザーIDを取得（認証が必須でない場合）
 *
 * @returns ユーザーID（認証されていない場合はundefined）
 */
export async function getCurrentUserId(): Promise<string | undefined> {
  try {
    const session = await auth();
    return session?.user?.id;
  } catch {
    return undefined;
  }
}
