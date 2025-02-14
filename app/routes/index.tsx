import { Suspense, useMemo } from 'react';

import { Await, createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { getProductsSchema } from '~/validations/product';

import type { Product } from '~/db/schema';
import { getProducts } from '~/server/product';
import { DataTable } from '~/components/data-table';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: search => getProductsSchema.parse(search),
  loaderDeps: ({ search: { pageIndex, pageSize } }) => ({ pageIndex, pageSize }),
  loader: ({ deps: { pageIndex, pageSize } }) => {
    return {
      promise: getProducts({ data: { pageIndex, pageSize } }),
    };
  },
});

function RouteComponent() {
  const { promise } = Route.useLoaderData();

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
      <Await promise={promise} fallback='Loading...'>
        {data => <DataTable columns={columns} data={data} />}
      </Await>
    </div>
  );
}
