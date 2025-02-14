import { useMemo } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { getProductsSchema } from '~/validations/product';

import type { Product } from '~/db/schema';
import { getProducts } from '~/server/product';
import { DataTable } from '~/components/data-table';
import { DataTableColumnHeader } from '~/components/data-table/data-table-column-header';

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
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
      },
      {
        accessorKey: 'description',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
      },
      {
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
      },
      {
        accessorKey: 'category',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
      },
      {
        accessorKey: 'stock',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Stock' />,
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
