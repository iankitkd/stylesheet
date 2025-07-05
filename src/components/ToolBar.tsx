import type { ColumnDef } from '@tanstack/react-table';

import { useTableContext } from '../contexts/TableContext';

import { exportToPDF } from '../utils/tableExport';
import { navigatorShare } from '../utils/navigatorShare';
import { importTableFromExcel } from '../utils/tableImport';

interface ToolBarProps {
  setData: (data: any[]) => void;
  setColumns: (columns: ColumnDef<any, any>[]) => void;
}

export default function ToolBar({ setData, setColumns }: ToolBarProps) {
  const table = useTableContext();
  const { getHeaderGroups, getRowModel } = table;

  const handleExport = () => {
    const exportColumns = getHeaderGroups()[0].headers.map((header) => ({
      header: String(header.column.columnDef.header),
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
    <div className="w-full flex justify-between items-center py-1 border-b border-border">
      {/* left side */}
      <div className="flex gap-1 items-center">
        <button className="hidden md:flex items-center justify-center gap-1 w-22 py-2 rounded-md hover:bg-secondary/30">
          <p>Tool bar</p>
          <img src="/icons/ChevronDouble.svg" alt="ChevronDouble icon" />
        </button>
        <div className="hidden md:block w-1 h-5 border-r-2 border-border"></div>
        <button className="flex items-center justify-center gap-1 lg:w-30 px-2 py-2 rounded-md hover:bg-secondary/30">
          <img src="/icons/Eye.svg" alt="Eye icon" />
          <p className="hidden lg:block">Hide fields</p>
        </button>
        <button className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md hover:bg-secondary/30">
          <img src="/icons/Sort.svg" alt="Sort icon" />
          <p className="hidden lg:block">Sort</p>
        </button>
        <button className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md hover:bg-secondary/30">
          <img src="/icons/Filter.svg" alt="Filter icon" />
          <p className="hidden lg:block">Filter</p>
        </button>
        <button className="flex items-center justify-center gap-1 lg:w-30 px-2 py-2 rounded-md hover:bg-secondary/30">
          <img src="/icons/ArrowAutofit.svg" alt="Arrow Autofit icon" />
          <p className="hidden lg:block">Cell View</p>
        </button>
      </div>

      {/* right side */}
      <div className="flex gap-1">
        <label
          htmlFor="file"
          className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30 hover:cursor-pointer"
        >
          <img src="/icons/Download.svg" alt="Download icon" />
          <p className="hidden lg:block">Import</p>
          <input id="file" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} hidden />
        </label>
        <button
          className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30 hover:cursor-pointer"
          onClick={handleExport}
        >
          <img src="/icons/Upload.svg" alt="Upload icon" />
          <p className="hidden lg:block">Export</p>
        </button>
        <button
          className="flex items-center justify-center gap-1 lg:w-22 px-2 py-2 rounded-md border border-secondary text-secondary-foreground hover:bg-secondary/30 hover:cursor-pointer"
          onClick={handleShare}
        >
          <img src="/icons/Share.svg" alt="Share icon" />
          <p className="hidden lg:block">Share</p>
        </button>
        <button className="flex items-center justify-center gap-1 lg:w-38 px-2 py-2 rounded-md bg-primary text-white hover:bg-primary/90 hover:cursor-pointer">
          <img src="/icons/ArrowSplit.svg" alt="Arrow split icon" />
          <p className="hidden lg:block">New Action</p>
        </button>
      </div>
    </div>
  );
}
