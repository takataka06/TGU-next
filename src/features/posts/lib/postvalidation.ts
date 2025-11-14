import { z} from "zod";
export const postSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です" }).max(100, { message: "タイトルは50文字以内で入力してください" }),
  content: z.string().min(1, { message: "コンテンツは必須です" }).max(5000, { message: "コンテンツは5000文字以内で入力してください" }),
});