import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, AlertTriangle, Clock, CheckCircle2, Plus, Filter } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { maintenanceRequests, contractors } from '@/data/demoData';
import type { MaintenanceStatus } from '@/types';

const columns: { id: MaintenanceStatus; label: string; icon: typeof Wrench; color: string }[] = [
  { id: 'reported', label: 'Reported', icon: AlertTriangle, color: '#3B82F6' },
  { id: 'assessed', label: 'Assessed', icon: Clock, color: '#F59E0B' },
  { id: 'quoted', label: 'Quoted', icon: Clock, color: '#A78BFA' },
  { id: 'approved', label: 'Approved', icon: CheckCircle2, color: '#10B981' },
  { id: 'in_progress', label: 'In Progress', icon: Wrench, color: '#14B8A6' },
  { id: 'completed', label: 'Completed', icon: CheckCircle2, color: '#10B981' },
];

const priorityOrder = { emergency: 0, urgent: 1, routine: 2, cosmetic: 3 };

export default function Maintenance() {
  const [filter, setFilter] = useState<string>('all');
  const requests = maintenanceRequests.filter(r => filter === 'all' || r.priority === filter);
  const openCount = maintenanceRequests.filter(m => m.status !== 'completed' && m.status !== 'closed').length;
  const completedCount = maintenanceRequests.filter(m => m.status === 'completed').length;
  const emergencyCount = maintenanceRequests.filter(m => m.priority === 'emergency').length;
  const totalCost = maintenanceRequests.reduce((s, m) => s + (m.actualCost || m.estimatedCost || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Maintenance Hub</h2>
          <p className="text-sm text-txt-secondary">{openCount} open orders • {contractors.length} contractors</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-bg-primary rounded-button text-sm font-medium hover:bg-accent-hover transition-colors">
          <Plus className="w-4 h-4" /> New Work Order
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Open Orders', value: openCount, color: 'text-warning' },
          { label: 'Completed', value: completedCount, color: 'text-success' },
          { label: 'Emergency', value: emergencyCount, color: 'text-danger' },
          { label: 'Est. Cost', value: `$${totalCost.toLocaleString()}`, color: 'text-txt-primary' },
        ].map(s => (
          <div key={s.label} className="bg-bg-secondary border border-white/[0.06] rounded-card p-4">
            <p className="text-xs text-txt-tertiary">{s.label}</p>
            <p className={`text-xl font-heading font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Filter className="w-4 h-4 text-txt-tertiary mt-2" />
        {['all', 'emergency', 'urgent', 'routine', 'cosmetic'].map(p => (
          <button key={p} onClick={() => setFilter(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === p ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-txt-secondary'}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {columns.map(col => {
          const colRequests = requests.filter(r => r.status === col.id)
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
          return (
            <div key={col.id} className="bg-bg-secondary border border-white/[0.06] rounded-card p-4">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/[0.06]">
                <col.icon className="w-4 h-4" style={{ color: col.color }} />
                <span className="text-sm font-medium text-txt-primary">{col.label}</span>
                <span className="ml-auto text-xs text-txt-tertiary">{colRequests.length}</span>
              </div>
              <div className="space-y-2">
                {colRequests.map((req, i) => (
                  <motion.div key={req.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="p-3 bg-bg-tertiary/50 rounded-lg border border-white/[0.04] hover:border-accent/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={req.priority} type={req.priority === 'emergency' ? 'danger' : req.priority === 'urgent' ? 'warning' : 'info'} />
                    </div>
                    <p className="text-xs font-medium text-txt-primary mb-1">{req.title}</p>
                    <p className="text-[11px] text-txt-secondary truncate">{req.propertyAddress}</p>
                    {req.assignedTo && <p className="text-[11px] text-txt-tertiary mt-1">{req.assignedTo}</p>}
                    {req.estimatedCost && <p className="text-[11px] font-mono text-accent mt-1">${req.estimatedCost}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
