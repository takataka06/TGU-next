import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Setting from "./Setting";
import { auth } from "@/auth";

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  return (
    <header className="sticky top-5 z-50">
      <Card className="m-5 rounded-full shadow-lg">
        <div className="flex container mx-auto justify-between pl-2">
          <Link href="/dashboard" className="text-2xl font-bold text-sky-400 hover:opacity-80 transition-opacity">
            TGU掲示板
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">投稿一覧</Link>
            </Button>
            <Setting session={session}/>
          </div>
        </div>
      </Card>
      
    </header>
  )
}
