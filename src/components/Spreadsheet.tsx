import { useState } from 'react';

import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';

import type { ColumnDef, RowData } from '@tanstack/react-table';

import { TableProvider } from '../contexts/TableContext';
import { getColumns } from './columns';

import { field, getEmptyField } from '../data';
import type { FieldType } from '../data';
import TopBar from './TopBar';
import MenuBar from './MenuBar';
import BottomBar from './BottomBar';
import TableView from './TableView';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function Spreadsheet() {
  const [data, setData] = useState<FieldType[]>([...field, ...getEmptyField(45)]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>(getColumns());

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
    <TableProvider value={table}>
      <div className="flex flex-col w-full h-full">
        <TopBar />
        <MenuBar setData={setData} setColumns={setColumns} />
        <div className="overflow-auto flex-1">
          <TableView />
        </div>
        <BottomBar setData={setData} setColumns={setColumns} />
      </div>
    </TableProvider>
  );
}
