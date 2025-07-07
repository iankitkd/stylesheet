import { useState } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import type { ColumnDef, RowData, SortingState } from '@tanstack/react-table';

import { TableProvider } from '../contexts/TableContext';
import { getColumns } from './columns';

import { field, getEmptyField } from '../data';
import type { FieldType } from '../data';
import TopBar from './TopBar';
import MenuBar from './MenuBar';
import BottomBar from './BottomBar';
import TableView from './TableView';
import EditableCell from './EditableCell';
import CustomHeader from './CustomHeader';
import AddColumn from './AddColumn';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function Spreadsheet() {
  const [isNewColumnModal, setIsNewColumnModal] = useState(false);

  const lastColumn = {
    id: 'newColButton',
    header: () => (
      <div
        className="p-2 w-24 h-10 bg-secondary flex justify-center cursor-pointer hover:opacity-80 border-x-2 border-dashed border-[#CBCBCB]"
        onClick={() => setIsNewColumnModal(true)}
      >
        {' '}
        <img src="/icons/Plus.svg" alt="Plus icon" />{' '}
      </div>
    ),
    size: 96,
    enableColumnFilter: false,
    columns: [
      {
        id: 'emptycol',
        size: 96,
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        header: <div className="w-24 h-10 border-x-2 border-dashed border-[#CBCBCB]"></div>,
        cell: <div className="w-24 h-10 border-x-2 border-dashed border-[#CBCBCB]"></div>,
      },
    ],
  };

  const [data, setData] = useState<FieldType[]>([...field, ...getEmptyField(45, 5)]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([...getColumns(), lastColumn]);

  const [globalFilter, setGlobalFilter] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      return Object.values(row.original)
        .join(' ')
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
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

  const addColumn = (newColumnName: string) => {
    if (!newColumnName.trim()) return;

    const currSize = columns.length;

    setColumns([
      ...columns.slice(0, currSize - 1),
      {
        id: newColumnName,
        accessorKey: newColumnName,
        meta: { exportLabel: newColumnName },
        header: () => <CustomHeader label={newColumnName} haveDropdown={true} />,
        cell: (info) => <EditableCell {...info} />,
      },
      columns[currSize - 1],
    ]);

    setData((prev) =>
      prev.map((item) => ({
        ...item,
        [newColumnName]: '',
      })),
    );
  };

  return (
    <TableProvider value={table}>
      <div className="flex flex-col w-full h-full">
        <TopBar setGlobalFilter={setGlobalFilter} />
        <MenuBar
          setData={setData}
          setColumns={setColumns}
          addColumn={addColumn}
          columnVisibility={columnVisibility}
          sorting={sorting}
          isFilterVisible={isFilterVisible}
          setIsFilterVisible={setIsFilterVisible}
        />
        <div className="overflow-auto flex-1">
          <TableView isFilterVisible={isFilterVisible} />
        </div>
        <BottomBar setData={setData} setColumns={setColumns} />
      </div>

      {isNewColumnModal && (
        <AddColumn addColumn={addColumn} onclose={() => setIsNewColumnModal(false)} />
      )}
    </TableProvider>
  );
}
