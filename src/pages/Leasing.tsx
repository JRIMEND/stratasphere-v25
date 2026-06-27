import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, FileText, Calendar, AlertCircle } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { leases } from '@/data/demoData';

export default function Leasing() {
  const [tab, setTab] = useState<'active' | 'expiring' | 'expired'>('active');

  const activeLeases = leases.filter(l => l.status === 'active');
  const expiringLeases = leases.filter(l => l.status === 'expiring');
  const expiredLeases = leases.filter(l => l.status === 'expired');
  const currentList = tab === 'active' ? activeLeases : tab === 'expiring' ? expiringLeases : expiredLeases;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Leasing Manager</h2>
          <p className="text-sm text-txt-secondary">{leases.length} total leases</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active', value: activeLeases.length, icon: Key, color: 'text-success' },
          { label: 'Expiring (30d)', value: expiringLeases.length, icon: AlertCircle, color: 'text-warning' },
          { label: 'Expired', value: expiredLeases.length, icon: Calendar, color: 'text-danger' },
          { label: 'Avg Rent/mo', value: `$${Math.round(leases.reduce((s, l) => s + l.rentMonthly, 0) / leases.length).toLocaleString()}`, icon: FileText, color: 'text-accent' },
        ].map(s => (
          <div key={s.label} className="bg-bg-secondary border border-white/[0.06] rounded-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <p className="text-xs text-txt-tertiary">{s.label}</p>
            </div>
            <p className={`text-xl font-heading font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-b border-white/[0.06]">
        {(['active', 'expiring', 'expired'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors relative ${tab === t ? 'text-accent' : 'text-txt-secondary hover:text-txt-primary'}`}>
            {t === 'active' ? 'Active Leases' : t === 'expiring' ? 'Expiring Soon' : 'Expired'}
            {tab === t && <motion.div layoutId="leaseTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        ))}
      </div>

      <div className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Tenant</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Property</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Period</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Status</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-txt-tertiary">Rent</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map(lease => (
              <tr key={lease.id} className="border-b border-white/[0.04] hover:bg-bg-tertiary/30 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-sm text-txt-primary">{lease.tenantName}</p>
                  <p className="text-xs text-txt-tertiary">{lease.paymentFrequency}</p>
                </td>
                <td className="px-5 py-3 text-xs text-txt-secondary">{lease.propertyAddress}</td>
                <td className="px-5 py-3 text-xs text-txt-secondary">
                  {new Date(lease.startDate).toLocaleDateString('en-AU')} - {new Date(lease.endDate).toLocaleDateString('en-AU')}
                </td>
                <td className="px-5 py-3"><StatusBadge status={lease.status} type={lease.status === 'active' ? 'success' : lease.status === 'expiring' ? 'warning' : 'danger'} /></td>
                <td className="px-5 py-3 text-right text-sm font-mono text-txt-primary">${lease.rentMonthly.toLocaleString()}</td>
              </tr>
            ))}
            {currentList.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-txt-secondary">No {tab} leases</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
