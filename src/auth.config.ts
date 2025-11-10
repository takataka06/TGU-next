import type { NextAuthConfig } from 'next-auth';
 
// ページ遷移や認可処理の設定を行う
export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/manage');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/auth/login', nextUrl)); // 未ログインユーザーがダッシュボードにアクセスした場合、ログインページへリダイレクト
      } else if (isLoggedIn && nextUrl.pathname === '/auth/login') { // ログイン済みユーザーがログインページにアクセスした場合
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;