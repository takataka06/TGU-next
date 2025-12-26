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

## 3.使用技術

| Category       | Technology Stack                                  |
| -------------- | ------------------------------------------------- |
| Frontend       | Next.js(16.0.1),TypeScript Tailwind(3.3.1)        |
| Backend        | Next.js(Route Handlers / Server Actions）         |
| Infrastructure | Vercel Supabase(db)                               |
| Database       | PostgreSQL                                        |
| UI library     | Shadcn(UIコンポーネント) lucide-react(アイコン)   |
| library        | auth.js(認証認可) zod(バリデーション) prisma(ORM) |
| etc.           | ESLint, Prettier                                  |

<br>

## 4.DB設計・ER図

準備中....
ER図

<img width="667" height="423" alt="Image" src="https://github.com/user-attachments/assets/298db3c6-92d0-437f-a1f2-f1e7f3611d36" />

## 5. 機能一覧

- ユーザー登録 / ログイン / ログアウト (auth.jsを使用)
- 投稿のCRUD機能
- バリデーション(zod)
- 操作ごとのフラッシュメッセージ
- ログイン中ユーザーのみ操作可能な認可
- 投稿へのいいね機能
- コメント機能
- フォロー機能

## 7. こだわった点

- フラッシュメッセージを Cookie ベースで実装し、props リレーを排除
- Server Actions、RSC を積極的に活用し、API 層を最小化
- Route Handlers を用いてサーバー処理を Next.js 内に統合
- いいね機能に Optimistic UI を採用
- ESLint Prettier によるコード品質の統一
- Bullet-proofを用いたディレクトリ設計
- エラーハンドリングの一元管理と適切なエラーメッセージ
- 認証チェックの共通化によるセキュリティ向上
- 環境変数の検証による設定ミスの早期検出

## 8. コード品質への取り組み

- **DRY原則**: エラーメッセージや認証チェックロジックの一元化
- **エラーハンドリング**: すべてのエラーケースを適切に処理し、明確なメッセージを提供
- **セキュリティ**: 認証チェック、所有権チェック、環境変数検証の徹底
- **保守性**: 意味のある変数名、適切なコメント、一貫したコーディングスタイル
