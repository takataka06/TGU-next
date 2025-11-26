'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { createPost } from '@/features/posts/actions/createPost';

export default function NewBlog() {
  const [state, formAction] = useActionState(createPost, { success: false, errors: {} });
  return (
    <>
      <header className="mb-10 flex w-full items-center justify-center pb-2">
        <Link href="/dashboard" className="absolute left-5 transition-opacity hover:opacity-40">
          ⇦記事一覧に戻る
        </Link>
        <h1 className="text-mono text-xl">新規投稿</h1>
      </header>
      <div className="container mx-auto">
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block font-medium">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
            {/*  stateにはバリデーションエラーが入っているので表示する */}
            {state.errors.title && (
              <p className="text-sm text-red-500">{state.errors.title.join(',')}</p>
            )}
          </div>
          <div>
            <label htmlFor="content" className="mb-1 block font-medium">
              内容
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            ></textarea>
          </div>
          {state.errors.content && (
            <p className="text-sm text-red-500">{state.errors.content.join(',')}</p>
          )}
          <div>
            <button
              type="submit"
              className="rounded-full bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-300"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
