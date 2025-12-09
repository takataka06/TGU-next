type CommentProps = {
  id: string;
  content: string;
  user: {
    name: string;
  };
};

export default function CommentSection({ comments }: { comments: CommentProps[] }) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="mx-auto max-w-2xl space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded border bg-gray-50 p-4">
            <div className="text-sm font-bold">{comment.user.name}</div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
