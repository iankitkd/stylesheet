import { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Eraser,
} from 'lucide-react';
import { cn } from '../lib/utils';

const fontSizes = ['12px', '14px', '16px', '18px', '24px', '32px'];
const fontFamilies = ['Arial', 'Georgia', 'Times New Roman', 'Verdana', 'Courier New'];

type Alignment = 'left' | 'center' | 'right' | 'justify';

export default function Toolbar() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [alignment, setAlignment] = useState<Alignment>('left');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Arial');

  const handleUndo = () => {};

  const handleRedo = () => {};

  const handleClearFormatting = () => {};

  return (
    <div className="flex items-center gap-2 py-1 border-b border-border whitespace-nowrap overflow-scroll scrollbar-hide">
      {/* Bold */}
      <button
        onClick={() => setIsBold(!isBold)}
        className={cn('p-2 rounded hover:bg-secondary/50', isBold && 'bg-secondary')}
      >
        <Bold className="w-4 h-4" />
      </button>

      {/* Italic */}
      <button
        onClick={() => setIsItalic(!isItalic)}
        className={cn('p-2 rounded hover:bg-secondary/50', isItalic && 'bg-secondary')}
      >
        <Italic className="w-4 h-4" />
      </button>

      {/* Underline */}
      <button
        onClick={() => setIsUnderline(!isUnderline)}
        className={cn('p-2 rounded hover:bg-secondary/50', isUnderline && 'bg-secondary')}
      >
        <Underline className="w-4 h-4" />
      </button>

      {/* Strikethrough */}
      <button
        onClick={() => setIsStrikethrough(!isStrikethrough)}
        className={cn('p-2 rounded hover:bg-secondary/50', isStrikethrough && 'bg-secondary')}
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      {/* Font Size */}
      <select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className="outline-0 border border-border rounded p-1 text-sm"
      >
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Font Family */}
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        className="outline-0 border border-border rounded p-1 text-sm"
      >
        {fontFamilies.map((family) => (
          <option key={family} value={family}>
            {family}
          </option>
        ))}
      </select>

      {/* Alignment */}
      <div className="flex space-x-1 px-6">
        <button
          onClick={() => setAlignment('left')}
          className={cn(
            'p-2 rounded hover:bg-secondary/50',
            alignment === 'left' && 'bg-secondary',
          )}
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setAlignment('center')}
          className={cn(
            'p-2 rounded hover:bg-secondary/50',
            alignment === 'center' && 'bg-secondary',
          )}
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => setAlignment('right')}
          className={cn(
            'p-2 rounded hover:bg-secondary/50',
            alignment === 'right' && 'bg-secondary',
          )}
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setAlignment('justify')}
          className={cn(
            'p-2 rounded hover:bg-secondary/50',
            alignment === 'justify' && 'bg-secondary',
          )}
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      {/* Undo */}
      <button onClick={handleUndo} className="p-2 rounded hover:bg-secondary/50">
        <Undo className="w-4 h-4" />
      </button>

      {/* Redo */}
      <button onClick={handleRedo} className="p-2 rounded hover:bg-secondary/50">
        <Redo className="w-4 h-4" />
      </button>

      {/* Clear formatting */}
      <button onClick={handleClearFormatting} className="p-2 rounded hover:bg-secondary/50">
        <Eraser className="w-4 h-4" />
      </button>
    </div>
  );
}
