import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useDebounce } from '~/hooks/use-debounce';

import { toSentenceCase } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

type DataTableFiltersProps<T> = {
  table: Table<T>;
};

export function DataTableFilters<T>({ table }: DataTableFiltersProps<T>) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [input, setInput] = useState(search.q);

  const debouncedValue = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedValue !== search.q) {
      // @ts-expect-error for ease of use
      navigate({ search: { ...search, q: debouncedValue } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const filterableColumnNames = table
    .getAllColumns()
    .filter(column => column.getCanFilter())
    .map(column => column.id);

  return (
    <div className='flex flex-1 items-center gap-2'>
      <Select
        value={search.filterBy}
        onValueChange={val => {
          // @ts-expect-error for ease of use
          navigate({ search: { ...search, filterBy: val } });
        }}
      >
        <SelectTrigger className='max-w-40'>
          <SelectValue placeholder='Filter by' />
        </SelectTrigger>
        <SelectContent>
          {filterableColumnNames.map(columnName => (
            <SelectItem key={columnName} value={columnName}>
              {toSentenceCase(columnName)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input value={input} onChange={e => setInput(e.target.value)} className='max-w-80' placeholder='Search...' />
      {/* @ts-expect-error for ease of use */}
      <Button variant='secondary' className='ml-auto' onClick={() => navigate({ search: {} })}>
        Clear Filters
      </Button>
    </div>
  );
}
