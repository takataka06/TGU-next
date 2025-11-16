import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePost } from "../actions/deletePost"


type DeletePostProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeletePostDialog({postId, isOpen, onOpenChange}:DeletePostProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>記事の削除</AlertDialogTitle>
          <AlertDialogDescription>
            本当にこの記事を削除してもよろしいですか？この操作は元に戻せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost(postId)}>削除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
