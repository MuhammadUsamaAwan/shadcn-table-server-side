import { defineConfig } from 'drizzle-kit';

import { serverEnv } from '~/config/serverEnv';

export default defineConfig({
  out: './migrations',
  schema: './app/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
});
