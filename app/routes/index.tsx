import { useMemo } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { getProductsSchema } from '~/validations/product';

import type { Product } from '~/db/schema';
import { getProducts } from '~/server/product';
import { DataTable } from '~/components/data-table';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: search => getProductsSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getProducts({ data: deps }),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnFilter: true,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableColumnFilter: true,
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableColumnFilter: true,
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
