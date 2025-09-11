import type { Config } from 'drizzle-kit';

export default {
  schema: './src/worker/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    wranglerConfigPath: './wrangler.toml',
    dbName: 'instagram-db',
  },
} satisfies Config;