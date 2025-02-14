import { useMemo } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';

import type { Product } from '~/db/schema';
import { getProducts } from '~/server/product';
import { DataTable } from '~/components/data-table';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => getProducts(),
});

function RouteComponent() {
  const products = Route.useLoaderData();

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
      },
    ],
    []
  );

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
