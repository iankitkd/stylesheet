import { flexRender } from '@tanstack/react-table';
import { useTableContext } from '../contexts/TableContext';

export default function TableView() {
  const table = useTableContext();
  const { getHeaderGroups, getRowModel } = table;

  return (
    <table className="table-auto border-0 border-border-table">
      <thead className="sticky top-0">
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="text-tertiary-foreground bg-secondary">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="border-x border-border-table text-left p-2"
                style={{ minWidth: `${header.column.getSize()}px` }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {getRowModel().rows.map((row) => {
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
