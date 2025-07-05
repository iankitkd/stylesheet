import * as XLSX from 'xlsx';
import type { ColumnDef } from '@tanstack/react-table';

export function importTableFromExcel(arrayBuffer: ArrayBuffer): {
  data: any[];
  columns: ColumnDef<any, any>[];
} {
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const wsname = workbook.SheetNames[0];
  const ws = workbook.Sheets[wsname];

  // Get raw data as 2D array
  const rawData: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

  if (rawData.length === 0) {
    return { data: [], columns: [] };
  }

  const headers = rawData[0];

  // Ensure headers are present or generate default keys like 'Column1', 'Column2'...
  const finalHeaders = headers.map((header, idx) =>
    header !== undefined && header !== null && header !== '' ? header : `Column${idx + 1}`,
  );

  const data = rawData.slice(1).map((row) => {
    const rowObj: Record<string, any> = {};
    finalHeaders.forEach((header, i) => {
      rowObj[header] = row[i] !== undefined ? row[i] : '';
    });
    return rowObj;
  });

  const columns: ColumnDef<any, any>[] = finalHeaders.map((header) => ({
    accessorKey: header,
    header,
  }));

  return { data, columns };
}
