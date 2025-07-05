import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';

import { emptyField, field } from '../data';
import { getColumns } from './columns';

const initialTabs = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

interface BottomBarProps {
  setData: (data: any[]) => void;
  setColumns: (columns: ColumnDef<any, any>[]) => void;
}

export default function BottomBar({ setData, setColumns }: BottomBarProps) {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState('All Orders');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    console.log(tab, 'tab');
    if (tab === initialTabs[0]) {
      setData([...field, ...emptyField]);
      setColumns(getColumns());
    } else {
      setData(emptyField);
    }
  };

  const handleNewTabClick = () => {
    const length = tabs.length;
    setTabs((prev) => [...prev, `Tab ${length + 1}`]);
    setActiveTab(`Tab ${length + 1}`);
    setData(emptyField);
    setColumns([]);
  };

  return (
    <div className="">
      <div className="flex items-center gap-[2px] pt-1 border-t border-border overflow-x-scroll whitespace-nowrap scrollbar-hide">
        <div className="hidden md:block w-8"></div>

        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-2 py-2 lg:px-4 lg:py-2 min-w-26 hover:bg-[#E8F0E9] border-[#4B6A4F] cursor-pointer ${
              tab === activeTab
                ? 'font-semibold bg-[#E8F0E9] text-[#3E5741] border-t-2'
                : 'font-medium text-tertiary-foreground'
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}

        <button
          className="p-2 min-w-10 hover:bg-[#E8F0E9] cursor-pointer"
          onClick={handleNewTabClick}
        >
          <img src="/icons/Plus.svg" alt="Plus icon" />
        </button>
      </div>
    </div>
  );
}
