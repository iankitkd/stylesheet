import { createColumnHelper } from '@tanstack/react-table';

import type { FieldType } from '../data';
import EditableCell from './EditableCell';

const columnHelper = createColumnHelper<FieldType>();

export function getColumns() {
  return [
    columnHelper.accessor('id', {
      header: '#',
      size: 20,
      cell: ({ row }) => <div className="p-2">{row.index + 1}</div>,
    }),
    columnHelper.accessor('request', {
      header: 'Job Request',
      size: 256,
      cell: (info) => <EditableCell {...info} />,
    }),
    columnHelper.accessor('submitted', {
      header: 'Submitted',
      size: 108,
      cell: (info) => <EditableCell {...info} />,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 140,
      cell: (info) => (
        <div className="p-2 text-center">
          <span
            className={`px-2 py-1 rounded-full font-medium
              ${
                info.getValue() === 'Completed'
                  ? 'bg-[#D3F2E3] text-[#0A6E3D]'
                  : info.getValue() === 'In-process'
                    ? 'bg-[#FFF3D6] text-[#85640B]'
                    : info.getValue() === 'Need to start'
                      ? 'bg-[#E2E8F0] text-[#475569]'
                      : info.getValue() === 'Blocked'
                        ? 'bg-[#FFE1DE] text-[#C22219]'
                        : ''
              }`}
          >
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('submitter', {
      header: 'Submitter',
      size: 120,
      cell: (info) => <EditableCell {...info} />,
    }),
    columnHelper.accessor('url', {
      header: 'URL',
      size: 120,
      cell: (info) => (
        <div className="p-2 w-30 text-ellipsis overflow-hidden">
          <a href={`https://${info.getValue()}`} className="underline text-sm">
            {info.getValue()}
          </a>
        </div>
      ),
    }),
    columnHelper.accessor('assigned', {
      header: 'Assigned',
      size: 120,
      cell: (info) => <EditableCell {...info} />,
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      size: 96,
      cell: (info) => (
        <div className="p-2 text-center">
          <span
            className={`font-semibold
            ${
              info.getValue() === 'High'
                ? 'text-[#EF4D44]'
                : info.getValue() === 'Medium'
                  ? 'text-[#C29210]'
                  : 'text-[#1A8CFF]'
            }`}
          >
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      size: 108,
      cell: (info) => <EditableCell {...info} />,
    }),
    columnHelper.accessor('estValue', {
      header: 'Est. Value',
      size: 108,
      cell: (info) => (
        <div className="flex gap-1 justify-end items-center">
          {info.getValue() && <span className="pl-1 text-[#AFAFAF]">₹</span>}
          <EditableCell {...info} />
        </div>
      ),
    }),
  ];
}
