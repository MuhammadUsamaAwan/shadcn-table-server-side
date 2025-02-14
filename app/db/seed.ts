import { faker } from '@faker-js/faker';

import { db } from '.';
import { productsTable } from './schema';

function generateProducts(count = 10) {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
      category: faker.commerce.department(),
      imageUrl: faker.image.url(),
      stock: faker.number.int({ min: 0, max: 100 }),
    });
  }
  return products;
}

async function main() {
  console.log('⏳ Running seed...');

  const start = Date.now();

  const products = generateProducts(100);
  await db.insert(productsTable).values(products);

  const end = Date.now();

  console.log(`✅ Seed completed in ${end - start}ms`);

  process.exit(0);
}

main().catch(err => {
  console.error('❌ Seed failed');
  console.error(err);
  process.exit(1);
});
