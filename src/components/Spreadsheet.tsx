import { useEffect, useMemo, useState } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import type { RowData, ColumnDef } from '@tanstack/react-table';

import { field } from '../data';
import type { FieldType } from '../data';

interface ColumnValue {
  id: string;
  header: string;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<FieldType>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        className="outline-0 ring-0 border-0"
      />
    );
  },
};

export function getColumns(): ColumnDef<FieldType>[] {
  const columnValues: ColumnValue[] = [
    { id: 'request', header: 'Job Request' },
    { id: 'submitted', header: 'Submitted' },
    { id: 'status', header: 'Status' },
    { id: 'submitter', header: 'Submitter' },
    { id: 'url', header: 'URL' },
    { id: 'assigned', header: 'Assigned' },
    { id: 'priority', header: 'Priority' },
    { id: 'dueDate', header: 'Due Date' },
    { id: 'estValue', header: 'Est. Value' },
  ];

  return [
    {
      id: 'rowNumber',
      header: '#',
      cell: ({ row }) => row.index + 1,
    },
    ...columnValues.map((value: ColumnValue) => ({
      accessorKey: value.id,
      header: value.header,
    })),
  ];
}

const emptyField: FieldType[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  request: '',
  submitted: '',
  status: '',
  submitter: '',
  url: '',
  assigned: '',
  priority: '',
  dueDate: '',
  estValue: '',
}));

export default function Spreadsheet() {
  const columns = useMemo<ColumnDef<FieldType>[]>(() => getColumns(), []);
  const [data, setData] = useState<FieldType[]>([...field, ...emptyField]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    debugTable: true,
  });

  return (
    <table className="table-auto border-2 border-border">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="text-secondary-foreground bg-secondary">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="border-2 border-border text-left p-2"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="p-2">
              {row.getVisibleCells().map((cell) => {
                {
                  console.log(row.id);
                }
                return (
                  <td key={cell.id} className="border-2 border-border p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
