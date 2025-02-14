import { createServerFn } from '@tanstack/start';
import { count } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '~/db';
import { productsTable } from '~/db/schema';

export const getProducts = createServerFn()
  .validator(
    z.object({
      pageIndex: z.number().int().optional().default(0),
      pageSize: z.number().int().optional().default(10),
    })
  )
  .handler(async ({ data }) => {
    const dataResultPromise = db
      .select()
      .from(productsTable)
      .limit(data.pageSize)
      .offset(data.pageIndex * data.pageSize);
    const countResultPromise = db.select({ count: count() }).from(productsTable);
    const [dataResult, countResult] = await Promise.all([dataResultPromise, countResultPromise]);
    return {
      data: dataResult,
      rowCount: countResult[0].count,
    };
  });
