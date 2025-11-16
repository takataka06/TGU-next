import PostSetting from "@/features/posts/components/PostSetting";
import { getPost } from "@/features/posts/lib/post"
import { notFound } from "next/navigation"
import { auth } from "@/auth";

type Params = {
  // paramsは非同期に取得されるので Promise 型にしている
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: Params) {
  const session = await auth()
  const userId = session?.user?.id
  const {id} = await params
  const post = await getPost(id)



  if (!post) {
    console.log("Post not found:", id)
    notFound() 
  }

  return (
      <div className="max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex mx-auto justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            {post.author.name}・{new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </p>
          {post.authorId === userId && (
          <PostSetting postId={post.id} />
        )}
        </div>

        <section>
          <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </section>
      </div>
  )
}
