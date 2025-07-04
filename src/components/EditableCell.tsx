import { useEffect, useState } from 'react';

import type { CellContext } from '@tanstack/react-table';

export default function EditableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, TValue>) {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="text-sm w-full p-2 rounded-md outline-0 focus-visible:ring-tertiary-foreground/50 focus-visible:ring-[1px] focus-visible:bg-secondary/30"
    />
  );
}
