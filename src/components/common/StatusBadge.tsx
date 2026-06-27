import { propertyTypeColors } from '@/types';
import type { PropertyType } from '@/types';

interface StatusBadgeProps {
  status: string;
  type?: 'success' | 'warning' | 'danger' | 'info' | 'volumetric' | 'property';
  propertyType?: PropertyType;
}

const statusMap: Record<string, { color: string; bg: string }> = {
  paid: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  active: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  held: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  completed: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  due: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  pending: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  expiring: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  assessed: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  quoted: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  overdue: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  emergency: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  urgent: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  reported: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  in_progress: { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
  approved: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  cosmetic: { color: '#A1A1AA', bg: 'rgba(161,161,170,0.1)' },
  routine: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  passed: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  open: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  draft: { color: '#A1A1AA', bg: 'rgba(161,161,170,0.1)' },
  expired: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  terminated: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  disconnected: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  transferring: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  inactive: { color: '#52525B', bg: 'rgba(82,82,91,0.1)' },
  suspended: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
};

export function StatusBadge({ status, type, propertyType }: StatusBadgeProps) {
  const lower = status.toLowerCase().replace(/\s+/g, '_');
  const mapped = statusMap[lower] || statusMap[type || 'info'] || { color: '#A1A1AA', bg: 'rgba(161,161,170,0.1)' };
  
  const color = propertyType ? propertyTypeColors[propertyType] : mapped.color;
  const bgColor = propertyType ? propertyTypeColors[propertyType] + '1A' : mapped.bg;

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: bgColor, color }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
