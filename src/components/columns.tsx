import { createColumnHelper } from '@tanstack/react-table';

import type { FieldType } from '../data';
import EditableCell from './EditableCell';
import CustomHeader from './CustomHeader';

export type CustomColumnMeta = {
  exportLabel: string;
};

const columnHelper = createColumnHelper<FieldType>();

export function getColumns() {
  return [
    columnHelper.accessor('id', {
      header: () => (
        <div className="w-9 h-10 flex justify-center items-center bg-secondary">
          <img src="/icons/Hash.svg" alt="Hash icon" className="w-5 h-5" />
        </div>
      ),
      meta: { exportLabel: '#' },
      size: 20,
      enableColumnFilter: false,
      cell: ({ row }) => <div className="p-2">{row.index + 1}</div>,
    }),
    columnHelper.group({
      id: 'overview',
      header: () => (
        <div className="flex items-center gap-3 px-2 py-1 bg-[#E2E2E2]">
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-secondary text-secondary-foreground">
            <img src="/icons/Link.svg" alt="Link icon" />
            <p className="font-normal">Q3 Financial Overview</p>
          </div>
          <div>
            <img src="/icons/ArrowSync.svg" alt="Arrow sync icon" />
          </div>
        </div>
      ),
      columns: [
        columnHelper.accessor('request', {
          header: () => (
            <CustomHeader label="Job Request" iconSrc="/icons/Briefcase.svg" haveDropdown={true} />
          ),
          meta: { exportLabel: 'Job Request' },
          size: 256,
          cell: (info) => <EditableCell {...info} />,
        }),
        columnHelper.accessor('submitted', {
          header: () => (
            <CustomHeader label="Submitted" iconSrc="/icons/Calendar.svg" haveDropdown={true} />
          ),
          meta: { exportLabel: 'Submitted' },
          size: 130,
          cell: (info) => <EditableCell {...info} />,
        }),
        columnHelper.accessor('status', {
          header: () => (
            <CustomHeader label="Status" iconSrc="/icons/ChevronCircle.svg" haveDropdown={true} />
          ),
          meta: { exportLabel: 'Status' },
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
          header: () => (
            <CustomHeader label="Submitter" iconSrc="/icons/Person.svg" haveDropdown={true} />
          ),
          meta: { exportLabel: 'Submitter' },
          size: 130,
          cell: (info) => <EditableCell {...info} />,
        }),
      ],
    }),

    columnHelper.accessor('url', {
      header: () => <CustomHeader label="URL" iconSrc="/icons/Globe.svg" haveDropdown={true} />,
      meta: { exportLabel: 'URL' },
      size: 120,
      cell: (info) => (
        <div className="p-2 w-30 text-ellipsis overflow-hidden">
          <a href={`https://${info.getValue()}`} className="underline text-sm">
            {info.getValue()}
          </a>
        </div>
      ),
    }),

    columnHelper.group({
      id: 'abc',
      size: 120,
      header: () => (
        <div className="flex items-center justify-center py-2 bg-[#D2E0D4] text-[#505450]">
          <div className="flex items-center gap-1">
            <img src="/icons/ArrowSplit.svg" alt="Link icon" />
            <p className="font-medium">ABC</p>
          </div>
          <div>
            <img src="/icons/Ellipsis.svg" alt="Arrow sync icon" />
          </div>
        </div>
      ),
      columns: [
        columnHelper.accessor('assigned', {
          header: () => (
            <CustomHeader
              label="Assigned"
              iconSrc="/icons/Emoji.svg"
              colors="bg-[#E8F0E9] text-[#666C66]"
            />
          ),
          meta: { exportLabel: 'Assigned' },
          size: 120,
          cell: (info) => <EditableCell {...info} />,
        }),
      ],
    }),

    columnHelper.group({
      id: 'answer',
      header: () => (
        <div className="flex items-center justify-center py-2 bg-[#DCCFFC] text-[#463E59]">
          <div className="flex items-center gap-1">
            <img src="/icons/ArrowSplit.svg" alt="icon" />
            <p className="font-medium">Answer a question</p>
          </div>
          <div>
            <img src="/icons/Ellipsis.svg" alt="icon" />
          </div>
        </div>
      ),
      columns: [
        columnHelper.accessor('priority', {
          header: () => <CustomHeader label="Priority" colors="bg-[#EAE3FC] text-[#655C80]" />,
          meta: { exportLabel: 'Priority' },
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
          header: () => <CustomHeader label="Due Date" colors="bg-[#EAE3FC] text-[#655C80]" />,
          meta: { exportLabel: 'Due Date' },
          size: 108,
          cell: (info) => <EditableCell {...info} />,
        }),
      ],
    }),

    columnHelper.group({
      id: 'extract',
      size: 108,
      header: () => (
        <div className="flex items-center justify-center py-2 bg-[#FAC2AF] text-[#695149]">
          <div className="flex items-center gap-1">
            <img src="/icons/ArrowSplit.svg" alt="Link icon" />
            <p className="font-medium">Extract</p>
          </div>
          <div>
            <img src="/icons/Ellipsis.svg" alt="Arrow sync icon" />
          </div>
        </div>
      ),
      columns: [
        columnHelper.accessor('estValue', {
          header: () => <CustomHeader label="Est. Value" colors="bg-[#FFE9E0] text-[#8C6C62]" />,
          meta: { exportLabel: 'Est. Value' },
          size: 108,
          cell: (info) => (
            <div className="flex gap-1 justify-end items-center">
              {info.getValue() && <span className="pl-1 text-[#AFAFAF]">₹</span>}
              <EditableCell {...info} />
            </div>
          ),
        }),
      ],
    }),
  ];
}
