"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react';
import Link from "next/link";
import DeletePostDialog from "./DeletePostDialog";
import { useState } from "react";

export default function PostSetting({ postId }: { postId: string }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropDownMenu,setIsDropDownMenu ] = useState(false);

  const handleDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open);
    // ダイアログが閉じられたときにドロップダウンメニューも閉じる
    if (!open) {
      setIsDropDownMenu(false);
    }
  }

  return (
    <>
      <DropdownMenu open={isDropDownMenu} onOpenChange={setIsDropDownMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/manage/posts/${postId}/edit`}>編集</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 cursor-pointor" onSelect={()=> {
            setIsDropDownMenu(false);
            setIsDeleteDialogOpen(true);
          }}>削除</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      { isDeleteDialogOpen && (
        <DeletePostDialog
          postId={postId}
          isOpen={isDeleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
        />
      ) }
    </>
  )
}
