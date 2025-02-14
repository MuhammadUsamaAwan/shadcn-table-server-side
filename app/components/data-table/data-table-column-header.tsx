import { useLocation, useNavigate } from '@tanstack/react-router';
import { type Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const isColumnSorted = search.sortBy === column.id;
  const sortDirection = search.sortDirection;

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='data-[state=open]:bg-accent -ml-3 h-8'>
            <span>{title}</span>

            {isColumnSorted ? sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown /> : <ChevronsUpDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => {
              navigate({
                search: {
                  ...search,
                  // @ts-expect-error fix later
                  sortBy: column.id,
                  sortDirection: 'asc',
                },
              });
            }}
          >
            <ArrowUp className='text-muted-foreground/70 h-3.5 w-3.5' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate({
                search: {
                  ...search,
                  // @ts-expect-error fix later
                  sortBy: column.id,
                  sortDirection: 'desc',
                },
              });
            }}
          >
            <ArrowDown className='text-muted-foreground/70 h-3.5 w-3.5' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate({
                search: {
                  ...search,
                  // @ts-expect-error fix later
                  sortBy: undefined,
                },
              });
            }}
          >
            <ChevronsUpDown className='text-muted-foreground/70 h-3.5 w-3.5' />
            Clear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
