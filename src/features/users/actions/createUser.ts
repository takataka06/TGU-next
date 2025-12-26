'use server';

import { registerSchema } from '../lib/uservalidation';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { setFlash } from '@/lib/flash-toaster';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';
import { SUCCESS_MESSAGES } from '@/lib/constants/success-messages';

type ActionState = {
  success: boolean;
  errors: Record<string, string[] | undefined>;
};

/**
 * 新規ユーザーを作成するServer Action
 * バリデーション、重複チェック、エラーハンドリングを適切に実装
 */
export async function createUser(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    //フォームから送信されたデータを取得
    const rawFormData = Object.fromEntries(
      ['name', 'email', 'password', 'confirmPassword'].map((field) => [
        field,
        formData.get(field) as string,
      ]),
    ) as Record<string, string>; // キーと値は両方string型

    //バリデーション
    const validationResult = registerSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      return handleValidationErrors(validationResult.error);
    }

    //DBにメールアドレスが保存されているか確認
    const existingUser = await prisma.user.findUnique({
      where: { email: rawFormData.email },
    });
    if (existingUser) {
      return handleError({ email: [ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS] });
    }

    //DBに保存
    const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);
    await prisma.user.create({
      data: {
        name: rawFormData.name,
        email: rawFormData.email,
        password: hashedPassword,
      },
    });

    //dashboardにリダイレクト
    await signIn('credentials', {
      // フォームの値を JavaScript の普通のオブジェクトに変換して渡す
      ...Object.fromEntries(formData),
      redirect: false,
    });

    // フラッシュメッセージをセット（定数を使用）
    await setFlash({
      type: 'success',
      message: SUCCESS_MESSAGES.USER.CREATED,
    });
    revalidatePath('/dashboard');

    redirect('/dashboard');
  } catch (error) {
    // 予期しないエラーを適切に処理
    console.error('ユーザー作成エラー:', error);
    return handleError({ _form: [ERROR_MESSAGES.USER.CREATE_FAILED] });
  }
}

//バリデーションエラー処理
function handleValidationErrors(error: ZodError): ActionState {
  // fieldErrorsは各フィールドごとのエラー、formErrorsはフォーム全体のエラー
  const { fieldErrors, formErrors } = error.flatten();
  // zodの仕様でパスワード一致エラーはformErrorsに入るため、手動でfieldErrorsに追加
  if (formErrors.length > 0) {
    return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors } };
  }
  return { success: false, errors: fieldErrors };
}

//カスタムエラー処理
//例：メールアドレスが既に存在する場合など
function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}
