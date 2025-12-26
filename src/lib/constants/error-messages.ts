/**
 * アプリケーション全体で使用するエラーメッセージの定数
 * エラーメッセージを一元管理することで保守性を向上
 */
export const ERROR_MESSAGES = {
  AUTH: {
    REQUIRED: 'ログインが必要です',
    INVALID_CREDENTIALS: 'メールアドレスまたはパスワードが違います',
    UNAUTHORIZED: '認証が必要です',
    SESSION_EXPIRED: 'セッションが期限切れです。再度ログインしてください',
  },
  POST: {
    NOT_FOUND: '投稿が見つかりません',
    NOT_OWNER: 'この投稿を編集・削除する権限がありません',
    CREATE_FAILED: '投稿の作成に失敗しました',
    UPDATE_FAILED: '投稿の更新に失敗しました',
    DELETE_FAILED: '投稿の削除に失敗しました',
  },
  USER: {
    EMAIL_ALREADY_EXISTS: 'このメールアドレスは既に使用されています',
    NOT_FOUND: 'ユーザーが見つかりません',
    CREATE_FAILED: 'アカウントの作成に失敗しました',
  },
  COMMENT: {
    REQUIRED: 'コメントを入力してください',
    NOT_FOUND: 'コメントが見つかりません',
    NOT_OWNER: 'このコメントを削除する権限がありません',
    CREATE_FAILED: 'コメントの作成に失敗しました',
    DELETE_FAILED: 'コメントの削除に失敗しました',
  },
  FOLLOW: {
    CANNOT_FOLLOW_SELF: '自分はフォローできません',
    FAILED: 'フォロー操作に失敗しました',
  },
  LIKE: {
    FAILED: 'いいね操作に失敗しました',
  },
  VALIDATION: {
    REQUIRED: '必須項目です',
    INVALID_FORMAT: '形式が正しくありません',
  },
  SERVER: {
    INTERNAL_ERROR: 'サーバーエラーが発生しました。時間をおいて再度お試しください',
    UNKNOWN_ERROR: '予期しないエラーが発生しました',
  },
} as const;
