'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LikeButtonProps = {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

export default function LikeButton({ postId, initialLiked, initialLikeCount }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      if (isLiked) {
        const res = await fetch(`/api/likes/${postId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
        }
      } else {
        const res = await fetch(`/api/likes/${postId}`, {
          method: 'POST',
        });
        if (res.ok) {
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error('いいね処理に失敗しました', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLoading} className="gap-1">
      <Heart
        className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
      />
      <span className="text-sm">{likeCount}</span>
    </Button>
  );
}
