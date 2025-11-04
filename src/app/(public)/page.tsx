import {
  Card,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TopPage() {
  return (
    <>
      <Card className="w-[250px] mx-auto md:w-[500px] p-6">
        <CardTitle className="text-3xl">Welcome to TGU掲示板</CardTitle>
        <CardContent>
          ここは東北学院大学の学生向け掲示板です。ログインまたは登録して、投稿を始めましょう！
        </CardContent>
        <div className="flex gap-4 mx-auto justify-between">
          <Button variant="secondary" asChild>
            <Link href="/auth/login">
              ログイン
            </Link>
          </Button>
          <Button className="bg-sky-400 hover:bg-sky-300" asChild>
            <Link href="/auth/register">
              新規登録
            </Link>
          </Button>
        </div>
      </Card>
    </>
  )
}
