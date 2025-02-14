import { createServerFn } from '@tanstack/start';
import { getProductsSchema } from '~/validations/product';
import { and, count, ilike } from 'drizzle-orm';

import { db } from '~/db';
import { productsTable } from '~/db/schema';

export const getProducts = createServerFn()
  .validator(getProductsSchema)
  .handler(async ({ data }) => {
    const whereConditions = and(
      data.filterBy && data.q ? ilike(productsTable[data.filterBy], `%${data.q}%`) : undefined
    );
    const dataResultPromise = db
      .select()
      .from(productsTable)
      .where(whereConditions)
      .limit(data.pageSize)
      .offset(data.pageIndex * data.pageSize);
    const countResultPromise = db.select({ count: count() }).from(productsTable).where(whereConditions);
    const [dataResult, countResult] = await Promise.all([dataResultPromise, countResultPromise]);
    return {
      data: dataResult,
      rowCount: countResult[0].count,
    };
  });
