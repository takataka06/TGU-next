import PostSetting from '@/features/posts/components/PostSetting';
import { getPost } from '@/features/posts/lib/post';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import CommentSection from '@/features/posts/components/CommentSection';
import { getComments } from '@/features/posts/lib/getComments';
import CommentForm from '@/features/posts/components/CommentForm';

type Params = {
  // paramsは非同期に取得されるので Promise 型にしている
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    console.log('Post not found:', id);
    notFound();
  }
  const comments = await getComments(post.id);

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mx-auto mb-4 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {post.author.name}・{new Date(post.createdAt).toLocaleDateString('ja-JP')}
        </p>
        {post.authorId === userId && <PostSetting postId={post.id} />}
      </div>

      <section>
        <p className="leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </section>
      <CommentSection comments={comments} />
      <CommentForm postId={post.id} />
    </div>
  );
}
