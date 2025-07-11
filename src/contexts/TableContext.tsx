import React, { createContext, useContext } from 'react';
import type { Table } from '@tanstack/react-table';

export const TableContext = createContext<Table<any> | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

interface TableProviderProps {
  value: Table<any>;
  children: React.ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ value, children }) => (
  <TableContext.Provider value={value}>{children}</TableContext.Provider>
);
