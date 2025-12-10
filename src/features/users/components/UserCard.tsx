import Avatar from "boring-avatars";
import Link from "next/link";

type UserProps = {
  id: string;
  name: string;
  createdAt: Date;
}

export default function UserCard({user,isOwner}: {user: UserProps; isOwner: boolean}) {
  return (
    <div className="border p-4 rounded shadow bg-gray-300 flex flex-col items-center">
      <Avatar name="Mary Edwards" size={80} variant="beam"/>
      <div className="text-lg font-bold mb-2">{user.name}</div>
      <div className="text-sm text-gray-700">Joined on:{user.createdAt.toLocaleDateString("ja-JP")}</div>
      {isOwner ? (
        <button className="mt-4 px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600">
          <Link href={`/users/${user.id}/edit`}>Edit</Link>
        </button>
      ) : (
        <button className="mt-4 px-4 py-1 bg-sky-500 text-white rounded-full hover:bg-sky-600">
          Follow
        </button>
      )}

    </div>
  )
}
