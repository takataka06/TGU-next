"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/features/users/actions/logout";
import { Session } from "next-auth"
import { User } from 'lucide-react';
import Link from "next/link";

export default function Setting({ session }: { session: Session }) {

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <User/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/manage/posts/new">新規投稿</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>設定</DropdownMenuItem>
          <DropdownMenuItem  className="cursor-pointer" onClick={logout}>ログアウト</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
