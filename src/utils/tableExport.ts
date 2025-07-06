import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface TableColumn {
  dataKey: string;
  exportLabel: string;
}
type TableData = Record<string, any>;

export const exportToPDF = (columns: TableColumn[], data: TableData[]) => {
  const doc = new jsPDF();

  doc.text('Stylesheet 3', 14, 20);

  // Build table head (headers)
  const tableHead = [columns.map((col) => col.exportLabel || col.dataKey)];

  // Build table body (rows)
  // const tableRows = data.map((row) => columns.map((col) => row[col.dataKey]));
  const tableRows = data
    .map(
      (row) => columns.map((col) => row[col.dataKey] ?? ''), // ensure no undefined
    )
    .filter((rowValues) => {
      // Remove the index of the 'id' column when checking for non-empty cells
      const valuesToCheck = rowValues.filter((_val, idx) => columns[idx].dataKey !== 'id');
      return valuesToCheck.some((val) => val !== ''); // remove empty rows
    });

  // Generate the table in PDF
  autoTable(doc, {
    head: tableHead,
    body: tableRows,
    startY: 30,
    styles: {
      fontSize: 10,
      textColor: [40, 40, 40],
    },
    headStyles: {
      fillColor: [100, 149, 237],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      1: { cellWidth: 40 },
    },
    margin: { top: 20, left: 10, right: 10 },
  });

  doc.save('stylesheet3.pdf');
};
