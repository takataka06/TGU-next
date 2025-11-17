"use server";

import { registerSchema } from "../lib/uservalidation";
import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { setFlash } from "@/lib/flash-toaster";
import { revalidatePath } from "next/cache";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
}

export async function createUser(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {

  //フォームから送信されたデータを取得
  const rawFormData = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map(field => [
      field,
      formData.get(field) as string
    ]
    )) as Record<string, string>; // キーと値は両方string型

  //バリデーション
  const validationResult = registerSchema.safeParse(rawFormData);
  console.log("rawFormData:", rawFormData);

  if (!validationResult.success) {
    return handleValidationErrors(validationResult.error);

  }

  //DBにメールアドレスが保存されているか確認
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFormData.email }
  })
  if (existingUser) {
    return handleError({ email: ["このメールアドレスは既に使用されています。"] });
  }
  //DBに保存
  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);
  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    }
  }
  );


  //dashboardにリダイレクト
  await signIn('credentials', {
    // フォームの値を JavaScript の普通のオブジェクトに変換して渡す
    ...Object.fromEntries(formData),
    redirect: false
  });

  // フラッシュメッセージをセット
  await setFlash({
    type: "success",
    message: "投稿を削除しました。",
  });
  revalidatePath("/dashboard");


  redirect('/dashboard');

}

//バリデーションエラー処理
function handleValidationErrors(error: any): ActionState {
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
  return { success: false, errors: customErrors }

}