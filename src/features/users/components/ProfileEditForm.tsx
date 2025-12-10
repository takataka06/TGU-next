'use client';

import { useState } from 'react';
import  Avatar  from 'boring-avatars';

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
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          
          <h1 className="text-2xl font-bold text-center mb-8">プロフィール編集</h1>

          {/* アバターアイコン（プレースホルダー） */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <Avatar name="Mary Edwards" size={80} variant="beam"/>
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400"
                  placeholder="名前を入力してください"
                />
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || name.length === 0}
                className="w-full flex justify-center items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all"
              >
                {isLoading ? (
                "変更中"
                ) : (
                  '変更する'
                )}
              </button>
            </div>

            {/* 保存完了メッセージ (ふわっと表示) */}
            {isSaved && (
              <div className="text-center text-green-600 text-sm font-medium animate-pulse">
                変更を保存しました！
              </div>
            )}

          </form>
        </div>
      </main>
    </div>
  );
}