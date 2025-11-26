import { PostCardProps } from '../types/post';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import LikeButton from './LikeButton';

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/manage/posts/${post.id}`} className="block">
      <Card className="transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {post.author.name}・{new Date(post.createdAt).toLocaleDateString('ja-JP')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-1 text-sm">{post.content}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <LikeButton
            postId={post.id}
            initialLiked={post.likedByMe}
            initialLikeCount={post.likeCount}
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
