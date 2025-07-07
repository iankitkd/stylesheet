import { cn } from '../lib/utils';

interface CustomHeaderProps {
  label: string;
  colors?: string;
  iconSrc?: string;
  haveDropdown?: boolean;
}

export default function CustomHeader({
  label,
  colors,
  iconSrc,
  haveDropdown = false,
}: CustomHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-2',
        colors ?? 'bg-secondary text-secondary-foreground',
      )}
    >
      <div className="flex items-center gap-1">
        {iconSrc && <img src={iconSrc} alt="Icon" />}
        <p className="font-semibold">{label}</p>
      </div>
      {haveDropdown && (
        <button>
          <img src="/icons/ChevronDown.svg" alt="Dropdown" />
        </button>
      )}
    </div>
  );
}
