import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

// Prismaクライアントのインスタンスを作成
const prisma = new PrismaClient();

async function main(){
  // クリーンアップ
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash("password123",10);

  // ユーザーを作成
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "test1",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "First Post",
            content: "これは最初のブログ投稿です。",
            published: true
          },
          {
            title: "Second Post",
            content: "これは2番目のブログ投稿です。",
            published: false
          }
        ]
      }
    }
  })
  console.log({user})
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
