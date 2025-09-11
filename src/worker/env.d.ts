
import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  N8N_WEBHOOK_URL: string;
  INTERNAL_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}
