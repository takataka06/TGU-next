import { auth } from '@/auth';
import UserCard from '@/features/users/components/UserCard';
import { getUser } from '@/features/users/lib/getUser';
import Link from 'next/link';

type Params = {
  // paramsは非同期に取得されるので Promise 型にしている
  params: Promise<{ id: string }>;
};

export default async function userDetailPage({ params }: Params) {
  const session = await auth();
  const { id } = await params;
  const user = await getUser(id);
  if (!user) {
    return <div>そのようなユーザーが見つかりません</div>;
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <UserCard user={user} isOwner={session?.user?.id === user.id} />
      {user.posts.map((post) => (
        <Link
          key={post.id}
          href={`/manage/posts/${post.id}`}
          className="block rounded border p-4 shadow transition-shadow duration-200 hover:shadow-md"
        >
          <h3 className="font-bold">{post.title}</h3>
          <p className="mt-2 text-gray-600">{post.content}</p>
          <p className="mt-2 text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleDateString('ja-JP')}
          </p>
        </Link>
      ))}
    </div>
  );
}
