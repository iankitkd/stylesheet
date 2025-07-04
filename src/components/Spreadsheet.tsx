import { useMemo, useState } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

import type { RowData } from '@tanstack/react-table';

import { emptyField, field } from '../data';
import type { FieldType } from '../data';

import { getColumns } from './columns';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function Spreadsheet() {
  const columns = useMemo(() => getColumns(), []);
  const [data, setData] = useState<FieldType[]>([...field, ...emptyField]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    <table className="table-auto border-2 border-border-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="text-secondary-foreground bg-secondary">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="border-2 border-border-table text-left p-2"
                style={{ minWidth: `${header.column.getSize()}px` }}
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
            <tr key={row.id} className="p-2 hover:bg-secondary/20">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-2 border-border-table">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
