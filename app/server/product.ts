import { createServerFn } from '@tanstack/start';

import { db } from '~/db';
import { productsTable } from '~/db/schema';

export const getProducts = createServerFn().handler(async () => {
  const result = await db.select().from(productsTable);
  return result;
});
