"use client"
import { useState, useActionState } from "react";
import Link from "next/link";
import { createPost } from "@/features/posts/actions/createPost";

export default function NewBlog() {
  const [state, formAction] = useActionState(
    createPost,
    { success: false, errors: {} }
  )
  return (
    <>
      <header className="w-full  pb-2 mb-10 flex justify-center items-center">
        <Link href="/dashboard" className="absolute left-5 hover:opacity-40 transition-opacity">⇦記事一覧に戻る</Link>
        <h1 className="text-xl text-mono ">新規投稿</h1>
      </header>
      <div className="container mx-auto">
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">タイトル</label>
            <input
              type="text"
              id="title"
              name="title"
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
              投稿する
            </button>
          </div>
        </form>
      </div>
    </>
  )
}