import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { User } from 'lucide-react';
import Link from "next/link";

export default function Setting({ session }: { session: Session }) {
  const handleLogout = async () => {
    "use server";
    await signOut();
  }

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
          <DropdownMenuItem  className="cursor-pointer" onClick={handleLogout}>ログアウト</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
