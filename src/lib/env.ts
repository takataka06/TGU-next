/**
 * 環境変数の検証と取得を行うユーティリティ
 * セキュリティ向上のため、環境変数の存在を明示的にチェック
 */

/**
 * 環境変数を取得し、存在しない場合はエラーを投げる
 * 本番環境での設定ミスを早期に検出するため
 *
 * @param key 環境変数のキー
 * @param defaultValue オプションのデフォルト値（開発環境のみ）
 * @returns 環境変数の値
 * @throws Error 環境変数が存在しない場合
 */
export function getRequiredEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;

  if (!value) {
    throw new Error(
      `環境変数 ${key} が設定されていません。アプリケーションを実行するにはこの環境変数が必要です。`,
    );
  }

  return value;
}

/**
 * 環境変数を取得（オプション）
 *
 * @param key 環境変数のキー
 * @param defaultValue デフォルト値
 * @returns 環境変数の値またはデフォルト値
 */
export function getOptionalEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] ?? defaultValue;
}
