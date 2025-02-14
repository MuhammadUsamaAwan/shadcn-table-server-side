import { decimal, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  price: decimal().notNull(),
  category: text().notNull(),
  imageUrl: text().notNull(),
  stock: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export type Product = typeof productsTable.$inferSelect;
