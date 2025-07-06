import { flexRender } from '@tanstack/react-table';
import { useTableContext } from '../contexts/TableContext';

interface TableViewProps {
  isFilterVisible: boolean;
}

export default function TableView({ isFilterVisible }: TableViewProps) {
  const table = useTableContext();
  const { getHeaderGroups, getRowModel } = table;

  return (
    <table className="table-auto border-0 border-border-table">
      <thead className="sticky top-0">
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-secondary text-secondary-foreground">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="border-x border-border-table text-left"
                style={{ minWidth: `${header.column.getSize()}px` }}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isFilterVisible && header.column.getCanFilter() && (
                      <div className="font-normal w-full">
                        <input
                          type="text"
                          value={(header.column.getFilterValue() ?? '') as string}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          placeholder={`Search`}
                          className="w-full px-2 py-1 rounded-md outline-0 focus-visible:ring-tertiary-foreground/50 focus-visible:ring-[1px] focus-visible:bg-secondary/30"
                        />
                      </div>
                    )}
                  </>
                )}
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
