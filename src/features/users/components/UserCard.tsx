import Avatar from 'boring-avatars';
import Link from 'next/link';
import FollowButton from './FollowButton';
import { getIsFollowing } from '../lib/repositories/userRepositories';

type UserProps = {
  id: string;
  name: string;
  createdAt: Date;
};

export default async function UserCard({ user, isOwner }: { user: UserProps; isOwner: boolean }) {
  const isFollowing = await getIsFollowing(user.id);
  return (
    <div className="flex flex-col items-center rounded border bg-gray-300 p-4 shadow">
      <Avatar name="Mary Edwards" size={80} variant="beam" />
      <div className="mb-2 text-lg font-bold">{user.name}</div>
      <div className="text-sm text-gray-700">
        Joined on:{user.createdAt.toLocaleDateString('ja-JP')}
      </div>
      {isOwner ? (
        <button className="mt-4 rounded-full bg-green-500 px-4 py-1 text-white hover:bg-green-600">
          <Link href={`/users/${user.id}/edit`}>Edit</Link>
        </button>
      ) : (
        <FollowButton targetUserId={user.id} initialIsFollowing={isFollowing} />
      )}
    </div>
  );
}
