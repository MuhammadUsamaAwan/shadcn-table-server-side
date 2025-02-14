import { z } from 'zod';

export const getProductsSchema = z.object({
  pageIndex: z.number().int().optional().default(0),
  pageSize: z.number().int().optional().default(10),
});
