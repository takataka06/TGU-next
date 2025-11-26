import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const { postId } = await params;
  try {
    await prisma.like.create({
      data: { userId, postId },
    });
    return new Response('OK', { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const { postId } = await params;

  try {
    await prisma.like.deleteMany({
      where: { userId, postId },
    });
    return new Response('OK', { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Error', { status: 500 });
  }
}
