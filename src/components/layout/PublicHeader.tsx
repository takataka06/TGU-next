import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PublicHeader() {
  return (
    <header className="sticky top-5 z-50">
      <Card className="m-5 rounded-full shadow-lg">
        <div className="container mx-auto flex justify-between pl-2">
          <Link
            href="/"
            className="text-2xl font-bold text-sky-400 transition-opacity hover:opacity-80"
          >
            TGU掲示板
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </Card>
    </header>
  );
}
