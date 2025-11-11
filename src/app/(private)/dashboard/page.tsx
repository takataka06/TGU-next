import PostCard from '@/features/posts/components/PostCard'
import { getPosts } from '@/features/posts/lib/post'

export default async function DashBoardPage() {
  const posts = await getPosts()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">投稿一覧</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
