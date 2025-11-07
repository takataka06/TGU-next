'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      // フォームの値を JavaScript の普通のオブジェクトに変換して渡す
      ...Object.fromEntries(formData),
      redirect: false
    });
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      // エラーが認証エラーの場合、適切なメッセージを返す
      switch (error.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが違います。';
        default:
          return 'エラーが発生しました。時間をおいて再度お試しください。';
      }
    }
    throw error;
  }
}


// ログイン処理を実行するサーバーアクション