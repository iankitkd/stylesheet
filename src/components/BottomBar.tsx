import { useState } from 'react';

const tabs = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

export default function BottomBar() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex items-center gap-[2px] pt-1 border-t border-border">
      <div className="w-8"></div>

      {tabs.map((tab) => (
        <button
          className={`px-4 py-2 hover:bg-[#E8F0E9] border-[#4B6A4F] ${
            tab === activeTab
              ? 'font-semibold bg-[#E8F0E9] text-[#3E5741] border-t-2'
              : 'font-medium text-tertiary-foreground'
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}

      <button className="p-2 hover:bg-[#E8F0E9]">
        <img src="/icons/Plus.svg" alt="Plus icon" />
      </button>
    </div>
  );
}
