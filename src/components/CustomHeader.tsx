import { cn } from '../lib/utils';

interface CustomHeaderProps {
  label: string;
  className?: string;
  iconSrc?: string;
  haveDropdown?: boolean;
}

export default function CustomHeader({
  label,
  className,
  iconSrc,
  haveDropdown = false,
}: CustomHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between p-2', className)}>
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
