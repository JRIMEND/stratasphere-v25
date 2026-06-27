import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Mail, Phone, Home, DollarSign, Shield } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { tenants, properties } from '@/data/demoData';

export default function Tenants() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = tenants.filter(t => {
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.unit.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.rentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const overdueCount = tenants.filter(t => t.rentStatus === 'overdue').length;
  const portalCount = tenants.filter(t => t.portalAccess).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Tenants</h2>
          <p className="text-sm text-txt-secondary">{filtered.length} tenants across {properties.length} properties</p>
        </div>
        <div className="flex gap-2">
          {overdueCount > 0 && <span className="px-3 py-1.5 bg-danger/10 text-danger text-xs rounded-full font-medium">{overdueCount} Overdue</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Tenants', value: tenants.length, color: 'text-accent' },
          { label: 'Portal Active', value: portalCount, color: 'text-success' },
          { label: 'Overdue', value: overdueCount, color: 'text-danger' },
          { label: 'Avg Rent/wk', value: `$${Math.round(tenants.reduce((s, t) => s + t.rentWeekly, 0) / tenants.length)}`, color: 'text-txt-primary' },
        ].map(s => (
          <div key={s.label} className="bg-bg-secondary border border-white/[0.06] rounded-card p-4">
            <p className="text-xs text-txt-tertiary">{s.label}</p>
            <p className={`text-xl font-heading font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-tertiary" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-white/[0.06] rounded-input text-sm outline-none focus:border-accent transition-colors"
            placeholder="Search tenants..." />
        </div>
        <div className="flex gap-2">
          {['all', 'paid', 'due', 'overdue'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${statusFilter === s ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-txt-secondary'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="bg-bg-secondary border border-white/[0.06] rounded-card p-5 hover:border-accent/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-accent">{t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-txt-primary">{t.name}</h3>
                  <p className="text-xs text-txt-secondary">{t.unit}</p>
                </div>
              </div>
              <StatusBadge status={t.rentStatus} type={t.rentStatus === 'overdue' ? 'danger' : t.rentStatus === 'due' ? 'warning' : 'success'} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex items-center gap-1.5 text-txt-secondary"><Mail className="w-3 h-3" /> <span className="truncate">{t.email}</span></div>
              <div className="flex items-center gap-1.5 text-txt-secondary"><Phone className="w-3 h-3" /> {t.phone}</div>
              <div className="flex items-center gap-1.5 text-txt-secondary"><Home className="w-3 h-3" /> <span className="truncate">{t.propertyAddress}</span></div>
              <div className="flex items-center gap-1.5 text-txt-secondary"><DollarSign className="w-3 h-3" /> ${t.rentWeekly}/wk</div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <StatusBadge status={t.bondStatus} type={t.bondStatus === 'held' ? 'success' : 'warning'} />
                <span className="text-xs text-txt-tertiary">Bond: ${t.bondAmount.toLocaleString()}</span>
              </div>
              {t.portalAccess && <Shield className="w-4 h-4 text-success" />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
