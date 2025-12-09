"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ content, postId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("送信失敗");

      // 成功したらフォームを空にする
      setContent("");
      
      // 現在のページを再取得して、コメント一覧を更新する
      router.refresh(); 
      
    } catch (error) {
      alert("コメントできませんでした");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="border p-2 rounded w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="コメントを書く..."
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        className="bg-sky-500 text-white px-4 py-2 rounded-full self-end disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "送信中..." : "コメントする"}
      </button>
    </form>
  );
}