/**
 * アプリケーション全体で使用する成功メッセージの定数
 * 成功メッセージを一元管理することで保守性を向上
 */
export const SUCCESS_MESSAGES = {
  POST: {
    CREATED: '新規投稿に成功しました。',
    UPDATED: '投稿を更新しました。',
    DELETED: '投稿を削除しました。',
  },
  USER: {
    CREATED: 'アカウントを作成しました。',
    UPDATED: 'プロフィールを更新しました。',
  },
  AUTH: {
    LOGGED_IN: 'ログインしました。',
    LOGGED_OUT: 'ログアウトしました。',
  },
} as const;
