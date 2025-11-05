import { PostCardProps } from "../types/post"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {post.author.name}・{new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-1">{post.content}</p>
        </CardContent>
      </Card>
    </Link>
  )
}