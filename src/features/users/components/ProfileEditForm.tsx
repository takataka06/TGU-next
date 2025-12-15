'use client';

import { useState } from 'react';
import Avatar from 'boring-avatars';

export default function ProfileEditPage() {
  // 初期値（本来はAPIから取得したデータが入ります）
  const [name, setName] = useState('現在のユーザー名');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    // APIコールの擬似的な遅延
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ここに更新処理を書く (例: await updateProfile({ name }))

    setIsLoading(false);
    setIsSaved(true);

    // 3秒後に「保存しました」メッセージを消す
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* メインコンテンツ */}
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="mb-8 text-center text-2xl font-bold">プロフィール編集</h1>

          {/* アバターアイコン（プレースホルダー） */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Avatar name="Mary Edwards" size={80} variant="beam" />
            </div>
          </div>

          {/* フォームエリア */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                表示名
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400"
                  placeholder="名前を入力してください"
                />
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || name.length === 0}
                className="focus:shadow-outline flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-3 font-bold text-white transition-all hover:bg-sky-600 focus:outline-none"
              >
                {isLoading ? '変更中' : '変更する'}
              </button>
            </div>

            {/* 保存完了メッセージ (ふわっと表示) */}
            {isSaved && (
              <div className="animate-pulse text-center text-sm font-medium text-green-600">
                変更を保存しました！
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
