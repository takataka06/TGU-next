'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CommentProps = {
  id: string;
  content: string;
  userId: string;
  user: {
    name: string;
  };
};

export default function CommentSection({
  comments,
  currentUserId,
}: {
  comments: CommentProps[];
  currentUserId?: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // commentId を引数で受け取る
  const handleDelete = async (commentId: string) => {
    if (!confirm('本当に削除しますか？')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('削除失敗');

      router.refresh();
    } catch (error) {
      alert(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="mx-auto max-w-2xl space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded border bg-gray-50 p-4">
            <div className="text-sm font-bold">{comment.user.name}</div>
            <div className="items-cneter flex justify-between">
              <p className="pt-2">{comment.content}</p>
              {currentUserId === comment.userId && (
                <button
                  className="mt-2 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  onClick={() => handleDelete(comment.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? '削除中...' : '削除'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
