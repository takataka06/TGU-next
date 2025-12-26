import { createClient } from '@supabase/supabase-js';
import { getRequiredEnv } from './env';

/**
 * Supabase の JS クライアントを初期化
 * 環境変数の検証を行い、設定ミスを早期に検出することでセキュリティを向上
 */
const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
