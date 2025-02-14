import { use } from 'react';

import { useLocation, useNavigate } from '@tanstack/react-router';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

import { DataTablePagination } from './data-table-pagination';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  promise: Promise<{ data: TData[]; rowCount: number }>;
};

export function DataTable<TData, TValue>({ columns, promise }: DataTableProps<TData, TValue>) {
  const { data, rowCount } = use(promise);
  const navigate = useNavigate();
  const { search } = useLocation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
    state: {
      pagination: {
        pageIndex: Number(search.pageIndex ?? '0'),
        pageSize: Number(search.pageSize ?? '10'),
      },
    },
    onPaginationChange: updater => {
      const pagination = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      navigate({
        search: {
          ...search,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      });
    },
  });

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
