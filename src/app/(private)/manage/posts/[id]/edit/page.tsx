import EditPostForm from "@/features/posts/components/EditPostForm"
import { getOwnPost } from "@/features/posts/lib/ownPost"
import { auth } from "@/auth";
import { notFound } from "next/navigation"

type Params = {
  params: Promise<{ id: string }>;
}
export default async function EditPage({params}:Params) {
  const session = await auth()
  const userId = session?.user?.id
  if (!session?.user?.email || !userId) {
    throw new Error("Unauthorized")
  }
  const {id} =  await params
  const post = await getOwnPost(userId,id)
  if (!post) {
    notFound()
  }
  return (
    <>
      <EditPostForm post={post}/>
    </>
  )
}
