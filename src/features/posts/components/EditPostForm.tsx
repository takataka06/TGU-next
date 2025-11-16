"use client"
import { useState, useActionState } from "react";
import Link from "next/link";
import { updatePost } from "../actions/updatePost";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    published: boolean;
  };
  }

export default function EditPostForm({post}:EditPostFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [state, formAction] = useActionState(
    updatePost,
    { success: false, errors: {} }
  )
  return (
    <>
      <header className="w-full  pb-2 mb-10 flex justify-center items-center">
        <Link href={`/manage/posts/${post.id}`} className="absolute left-5 hover:opacity-40 transition-opacity">⇦一覧詳細に戻る</Link>
        <h1 className="text-xl text-mono ">投稿編集</h1>
      </header>
      <div className="container mx-auto">
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">タイトル</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            {/*  stateにはバリデーションエラーが入っているので表示する */}
            {state.errors.title && (
              <p className="text-sm text-red-500">{state.errors.title.join(",")}</p>
            )}
          </div>
          <div>
            <label htmlFor="content" className="block font-medium mb-1">内容</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            ></textarea>
          </div>
          {state.errors.content && (
              <p className="text-sm text-red-500">{state.errors.content.join(",")}</p>
            )}
          <div>
            <button
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-300 transition-colors"
            >
              更新する
            </button>
            <input type="hidden" name="postId" value={post.id} />
          </div>
        </form>
      </div>
    </>
  )
}