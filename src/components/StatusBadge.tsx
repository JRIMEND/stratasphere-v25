import type { LucideIcon } from 'lucide-react';

interface StatusBadgeProps {
  label: string;
  color?: string;
  bgColor?: string;
  icon?: LucideIcon;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ label, color = '#A1A1AA', bgColor = 'rgba(255,255,255,0.08)', icon: Icon, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium capitalize ${size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}
      style={{ color, backgroundColor: bgColor }}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
}
