import { drizzle } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';

// Definições das tabelas (esquema)
import * as schema from './schema';

export let db: DrizzleD1Database<typeof schema> | null = null;

export function getDb(D1: D1Database): DrizzleD1Database<typeof schema> {
  if (!db) {
    db = drizzle(D1, { schema });
  }
  return db;
}

export type Database = DrizzleD1Database<typeof schema>;