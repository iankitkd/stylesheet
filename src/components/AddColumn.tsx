import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { cn } from '../lib/utils';

interface AddColumnProps {
  onclose: () => void;
  addColumn: (value: string) => void;
}

export default function AddColumn({ onclose, addColumn }: AddColumnProps) {
  const [newColumnName, setNewColumnName] = useState('');

  const handleCreate = () => {
    if (!newColumnName) return;

    addColumn(newColumnName);
    setNewColumnName('');
    onclose();
  };

  return (
    <ModalWrapper title="Add New Column" onClose={onclose}>
      <div className="text-center space-y-6 pb-8">
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          autoFocus
          className="w-full p-2 rounded-md border border-tertiary-foreground/50 outline-0 focus-visible:ring-tertiary-foreground/50 focus-visible:ring-[1px] focus-visible:bg-secondary/30"
        />
        <button
          className={cn(
            'font-semibold text-lg w-full px-10 py-1 rounded-full bg-primary text-primary-foreground cursor-pointer',
            newColumnName === '' && 'bg-primary/70',
          )}
          onClick={handleCreate}
          disabled={newColumnName === ''}
        >
          Create
        </button>
      </div>
    </ModalWrapper>
  );
}
