import { object, string} from 'zod';

export const registerSchema = object({
  name: string().min(1, '名前は必須です').max(30, '名前は30文字以下で入力してください。'),
  email: string().email('有効なメールアドレスを入力してください。'),
  password: string().min(6, 'パスワードは6文字以上で入力してください。').max(32, 'パスワードは32文字以下で入力してください。'),
  confirmPassword: string().min(1, '確認用パスワードは必須です。').max(32, '確認用パスワードは32文字以下で入力してください。')})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードと確認用パスワードが一致しません。',
    path: ['confirmPassword'],

});