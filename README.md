# TGU掲示板アプリ(最新)

## 1.アプリの概要と動機
元の Rails 版は以下のリポジトリにあります
https://github.com/takataka06/TGU-

移行理由は以下の通りです。
- Next.js の方が UI コンポーネント設計や状態管理がシンプル
- SEO が必要な掲示板アプリとの相性が良い（App Router + RSC）
- 実務寄りのスタックに触れる学習目的

  
## 2.アプリ利用方法
こちらのurlにアクセスすることで利用できます。
https://tgu-next.vercel.app/

---
## 3.使用技術と選定理由

| Category       | Technology Stack                                     |
| -------------- | ---------------------------------------------------- |
| Frontend       | Next.js(16.0.1),TypeScript Tailwind(3.3.1)           |
| Backend        | Next.js(Route Handlers / Server Actions）                                           |
| Infrastructure | Vercel Supabase(db)                                  |
| Database       | PostgreSQL                                           |
| UI library     | Shadcn(UIコンポーネント) lucide-react(アイコン)          |
| library        | auth.js(認証認可) zod(バリデーション) prisma(ORM)        |
| etc.           | ESLint, Prettier                                     |

<br>

## 4.DB設計・ER図

準備中....

## 5. 機能一覧

- ユーザー登録 / ログイン / ログアウト (auth.jsを使用)
- 投稿のCRUD機能
- バリデーション(zod)
- 操作ごとのフラッシュメッセージ
- ログイン中ユーザーのみ操作可能な認可
- 投稿へのいいね機能

## 6. こだわった点

- フラッシュメッセージを Cookie ベースで実装し、props リレーを排除
- Server Actions、RSC を積極的に活用し、API 層を最小化
- Route Handlers を用いてサーバー処理を Next.js 内に統合
- いいね機能に Optimistic UI を採用
- ESLint Prettier によるコード品質の統一
- Bullet-proofを用いたディレクトリ設計
