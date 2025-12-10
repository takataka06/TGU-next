"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 親コンポーネントから「誰をフォローするか」と「今の状態」をもらう
type FollowButtonProps = {
  targetUserId: string;
  initialIsFollowing: boolean;
}

export default function FollowButton({ targetUserId, initialIsFollowing }: FollowButtonProps) {
  // サーバーから受け取った初期値をstateに入れる
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);

    try {
      // 1. APIを叩く
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId }),
      });

      if (!res.ok) throw new Error("Failed");

      // 2. APIから返ってきた「最新の状態」を受け取る
      const data = await res.json(); // { isFollowing: true/false }
      
      // 3. 画面のボタンの状態を更新する
      setIsFollowing(data.isFollowing);

      // 4. (任意) フォロワー数の表示などを更新するためにページ全体をリフレッシュ
      router.refresh();

    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // UIの出し分け
  if (isFollowing) {
    // フォロー中のデザイン
    return (
      <button 
        onClick={handleToggle} 
        disabled={isLoading}
        className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100 disabled:opacity-50"
      >
        フォロー中
      </button>
    );
  } else {
    // フォローしていない時のデザイン
    return (
      <button 
        onClick={handleToggle} 
        disabled={isLoading}
        className="bg-black text-white px-4 py-2 rounded text-sm hover:opacity-80 disabled:opacity-50"
      >
        フォローする
      </button>
    );
  }
}