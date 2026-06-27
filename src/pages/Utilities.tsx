import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Wifi, Sun, Fuel, Phone, Plug, Search } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { utilityConnections, properties } from '@/data/demoData';

const typeIcons: Record<string, typeof Zap> = {
  electricity: Zap, water: Droplets, internet: Wifi, solar: Sun, gas: Fuel, phone: Phone, ev_charging: Plug
};

const typeColors: Record<string, string> = {
  electricity: '#F59E0B', water: '#3B82F6', internet: '#EC4899', solar: '#10B981', gas: '#F97316', phone: '#8B5CF6', ev_charging: '#14B8A6'
};

export default function Utilities() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = utilityConnections.filter(u => {
    const matchesSearch = !search || u.provider.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || u.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalMonthly = utilityConnections.reduce((s, u) => s + (u.monthlyCost || 0), 0);
  const activeCount = utilityConnections.filter(u => u.status === 'active').length;
  const solarCount = utilityConnections.filter(u => u.type === 'solar').length;
  const evCount = utilityConnections.filter(u => u.type === 'ev_charging').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-medium text-txt-primary">Utility Hub</h2>
        <p className="text-sm text-txt-secondary">{utilityConnections.length} connections across {properties.length} properties</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Monthly', value: `$${totalMonthly.toFixed(2)}`, color: 'text-accent' },
          { label: 'Active', value: activeCount, color: 'text-success' },
          { label: 'Solar', value: solarCount, color: 'text-warning' },
          { label: 'EV Charging', value: evCount, color: 'text-info' },
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
            className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-white/[0.06] rounded-input text-sm outline-none focus:border-accent"
            placeholder="Search providers..." />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <button onClick={() => setTypeFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${typeFilter === 'all' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-txt-secondary'}`}>All</button>
          {Object.keys(typeIcons).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${typeFilter === t ? 'text-bg-primary' : 'bg-bg-tertiary text-txt-secondary'}`}
              style={typeFilter === t ? { backgroundColor: typeColors[t] } : undefined}>{t.replace('_', ' ')}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((u, i) => {
          const Icon = typeIcons[u.type] || Zap;
          const color = typeColors[u.type] || '#14B8A6';
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-bg-secondary border border-white/[0.06] rounded-card p-5 hover:border-accent/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '1A' }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-txt-primary">{u.provider}</p>
                    <p className="text-xs text-txt-secondary capitalize">{u.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <StatusBadge status={u.status} type="success" />
              </div>
              <div className="space-y-1 text-xs text-txt-secondary">
                <p>Property: {u.propertyAddress}</p>
                <p>Account: {u.accountNumber}</p>
                {u.meterNumber && <p>Meter: {u.meterNumber}</p>}
                {u.nmi && <p>NMI: {u.nmi}</p>}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                <span className="text-xs text-txt-tertiary">Since {new Date(u.connectionDate).toLocaleDateString('en-AU')}</span>
                {u.monthlyCost !== undefined && (
                  <span className="text-sm font-mono" style={{ color: u.monthlyCost < 0 ? '#10B981' : '#EAEAEA' }}>
                    {u.monthlyCost < 0 ? '+' : ''}${Math.abs(u.monthlyCost).toFixed(2)}/mo
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
