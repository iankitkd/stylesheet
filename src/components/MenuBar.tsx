import { useState } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';

import Toolbar from './ToolBar';
import ModalWrapper from './ModalWrapper';

import { useTableContext } from '../contexts/TableContext';
import type { CustomColumnMeta } from './columns';

import { exportToPDF } from '../utils/tableExport';
import { navigatorShare } from '../utils/navigatorShare';
import { importTableFromExcel } from '../utils/tableImport';
import { cn } from '../lib/utils';

interface ToolBarProps {
  setData: (data: any[]) => void;
  setColumns: (columns: ColumnDef<any, any>[]) => void;
  addColumn: (newColumnName: string) => void;
  columnVisibility: {};
  sorting: SortingState;
  isFilterVisible: boolean;
  setIsFilterVisible: (value: boolean) => void;
}

export default function MenuBar({
  setData,
  setColumns,
  addColumn,
  columnVisibility,
  sorting,
  isFilterVisible,
  setIsFilterVisible,
}: ToolBarProps) {
  const table = useTableContext();
  const { getHeaderGroups, getRowModel } = table;

  const [newColumnName, setNewColumnName] = useState('');
  const [isToolsVisible, setIsToolsVisible] = useState(false);
  const [isNewActionModal, setIsNewActionModal] = useState(false);
  const [isHideColumnModal, setIsHideColumnModal] = useState(false);
  const [isSortModal, setIsSortModal] = useState(false);

  const handleCreate = () => {
    if (!newColumnName) return;

    addColumn(newColumnName);
    setNewColumnName('');
    setIsNewActionModal(false);
  };

  const handleExport = () => {
    const headerGroups = getHeaderGroups();
    const lastHeaderGroup = headerGroups[headerGroups.length - 1];
    const exportColumns = lastHeaderGroup.headers.map((header) => ({
      exportLabel: (header.column.columnDef.meta as CustomColumnMeta)?.exportLabel,
      dataKey: header.column.id,
    }));

    const exportData = getRowModel().rows.map((row) => {
      const rowData: { [key: string]: any } = {};
      row.getAllCells().forEach((cell) => {
        rowData[cell.column.id] = cell.getValue();
      });
      return rowData;
    });

    exportToPDF(exportColumns, exportData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result;
      if (!result) return;

      const { data, columns } = importTableFromExcel(result as ArrayBuffer);
      setData(data);
      setColumns(columns);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleShare = () => {
    navigatorShare('/');
  };

  return (
    <>
      <div className="w-full flex justify-between items-center py-1 border-b border-border">
        {/* left side */}
        <div className="flex gap-1 items-center">
          <button
            className={`flex items-center justify-center gap-1 w-8 lg:w-22 px-2 lg:px-0 py-2 rounded-md hover:bg-secondary/30 cursor-pointer ${isToolsVisible && 'bg-secondary'}`}
            onClick={() => setIsToolsVisible(!isToolsVisible)}
          >
            <p className="hidden lg:block">Tool bar</p>
            <img
              src="/icons/ChevronDouble.svg"
              alt="ChevronDouble icon"
              className={`${isToolsVisible ? '-rotate-90' : 'rotate-90'} transition-all duration-300`}
            />
          </button>
          <div className="hidden md:block w-1 h-5 border-r-2 border-border"></div>
          <button
            className={`flex items-center justify-center gap-1 lg:w-30 px-2 py-2 rounded-md hover:bg-secondary/30 cursor-pointer ${Object.values(columnVisibility).some((val) => val == false) && 'bg-secondary'}`}
            onClick={() => setIsHideColumnModal(true)}
          >
            <img src="/icons/Eye.svg" alt="Eye icon" />
            <p className="hidden lg:block">Hide fields</p>
          </button>
          <button
            className={`flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md hover:bg-secondary/30 cursor-pointer ${sorting.length > 0 && 'bg-secondary'}`}
            onClick={() => setIsSortModal(true)}
          >
            <img src="/icons/Sort.svg" alt="Sort icon" />
            <p className="hidden lg:block">Sort</p>
          </button>
          <button
            className={`flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md hover:bg-secondary/30 cursor-pointer ${isFilterVisible && 'bg-secondary'}`}
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <img src="/icons/Filter.svg" alt="Filter icon" />
            <p className="hidden lg:block">Filter</p>
          </button>
          <button
            className="flex items-center justify-center gap-1 lg:w-30 px-2 py-2 rounded-md hover:bg-secondary/30 cursor-pointer"
            onClick={() => alert('Cell View')}
          >
            <img src="/icons/ArrowAutofit.svg" alt="Arrow Autofit icon" />
            <p className="hidden lg:block">Cell View</p>
          </button>
        </div>

        {/* right side */}
        <div className="flex gap-1">
          <label
            htmlFor="file"
            className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30 cursor-pointer"
          >
            <img src="/icons/Download.svg" alt="Download icon" />
            <p className="hidden lg:block">Import</p>
            <input id="file" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} hidden />
          </label>
          <button
            className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30 cursor-pointer"
            onClick={handleExport}
          >
            <img src="/icons/Upload.svg" alt="Upload icon" />
            <p className="hidden lg:block">Export</p>
          </button>
          <button
            className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30 cursor-pointer"
            onClick={handleShare}
          >
            <img src="/icons/Share.svg" alt="Share icon" />
            <p className="hidden lg:block">Share</p>
          </button>
          <button
            className="flex items-center justify-center gap-1 lg:w-38 px-2 py-2 rounded-md bg-primary text-white hover:bg-primary/90 cursor-pointer"
            onClick={() => setIsNewActionModal(true)}
          >
            <img src="/icons/ArrowSplit.svg" alt="Arrow split icon" />
            <p className="hidden lg:block">New Action</p>
          </button>
        </div>
      </div>

      {isToolsVisible && <Toolbar />}

      {isNewActionModal && (
        <ModalWrapper title="Add New Column" onClose={() => setIsNewActionModal(false)}>
          <div className="text-center space-y-6 pb-8">
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              autoFocus
              className="w-full p-2 rounded-md border border-tertiary-foreground/50 outline-0 focus-visible:ring-tertiary-foreground/50 focus-visible:ring-[1px] focus-visible:bg-secondary/30"
            />
            <button
              className={cn(
                'font-semibold text-lg w-full px-10 py-1 rounded-full bg-primary text-primary-foreground cursor-pointer',
                newColumnName === '' && 'bg-primary/70',
              )}
              onClick={handleCreate}
              disabled={newColumnName === ''}
            >
              Create
            </button>
          </div>
        </ModalWrapper>
      )}

      {isHideColumnModal && (
        <ModalWrapper title="Show / hide Columns" onClose={() => setIsHideColumnModal(false)}>
          <div className="grid grid-cols-2 gap-2 py-2">
            {table.getAllLeafColumns().map((column) => (
              <label
                key={column.id}
                className="inline-flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-secondary/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
                <span>{column.id}</span>
              </label>
            ))}
          </div>
        </ModalWrapper>
      )}

      {isSortModal && (
        <ModalWrapper title="Sort Columns" onClose={() => setIsSortModal(false)}>
          <div className="grid grid-cols-2 gap-2 py-2">
            {table.getAllLeafColumns().map((column) => (
              <label
                key={column.id}
                className="inline-flex items-center justify-between w-32 gap-2 px-2 py-1 rounded-lg hover:bg-secondary/50 cursor-pointer"
                onClick={column.getToggleSortingHandler()}
              >
                <span>{column.id}</span>
                <span className="text-primary font-semibold text-xl">
                  {!column.getIsSorted() && '\u21C5'}
                  {column.getIsSorted() === 'asc' && '\u2193'}
                  {column.getIsSorted() === 'desc' && '\u2191'}
                </span>
              </label>
            ))}
          </div>
        </ModalWrapper>
      )}
    </>
  );
}
