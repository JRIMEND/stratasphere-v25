import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Building2, Filter, Plus, Grid3X3, List } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { properties } from '@/data/demoData';
import { propertyTypeColors } from '@/types';
import type { PropertyType } from '@/types';

const typeFilters: PropertyType[] = ['balance', 'apartment', 'retail', 'farm', 'residential', 'commercial', 'industrial'];

export default function Properties() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = properties.filter(p => {
    const matchesSearch = !search || p.address.toLowerCase().includes(search.toLowerCase()) || p.suburb.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Properties</h2>
          <p className="text-sm text-txt-secondary">{filtered.length} of {properties.length} properties</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-bg-tertiary rounded-lg p-0.5">
            <button onClick={() => setView('grid')} className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-accent text-bg-primary' : 'text-txt-tertiary hover:text-txt-secondary'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')} className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-accent text-bg-primary' : 'text-txt-tertiary hover:text-txt-secondary'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-bg-primary rounded-button text-sm font-medium hover:bg-accent-hover transition-colors">
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-tertiary" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-white/[0.06] rounded-input text-sm text-txt-primary placeholder-txt-tertiary outline-none focus:border-accent transition-colors"
            placeholder="Search address, suburb..." />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => setTypeFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${typeFilter === 'all' ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-txt-secondary hover:text-txt-primary'}`}>
            All Types
          </button>
          {typeFilters.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${typeFilter === t ? 'text-bg-primary' : 'bg-bg-tertiary text-txt-secondary hover:text-txt-primary'}`}
              style={typeFilter === t ? { backgroundColor: propertyTypeColors[t] } : undefined}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/properties/${p.id}`)}
              className="bg-bg-secondary border border-white/[0.06] rounded-card p-5 hover:border-accent/20 hover:shadow-[0_0_24px_rgba(20,184,166,0.06)] transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: propertyTypeColors[p.type] + '1A' }}>
                    <Building2 className="w-5 h-5" style={{ color: propertyTypeColors[p.type] }} />
                  </div>
                  <div>
                    <StatusBadge status={p.type} type="property" propertyType={p.type} />
                  </div>
                </div>
                <span className="text-lg font-heading font-medium text-txt-primary">{p.occupancyRate}%</span>
              </div>
              <h3 className="text-sm font-medium text-txt-primary mb-1 group-hover:text-accent transition-colors">{p.address}</h3>
              <p className="text-xs text-txt-secondary mb-3">{p.suburb}, {p.state} {p.postcode}</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <span className="text-xs text-txt-tertiary">{p.floors} floors • {p.yearBuilt}</span>
                <span className="text-sm font-mono text-accent">${p.revenueMonthly.toLocaleString()}/mo</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary uppercase">Property</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary uppercase">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary uppercase">Suburb</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary uppercase">Occupancy</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-txt-tertiary uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} onClick={() => navigate(`/properties/${p.id}`)}
                  className="border-b border-white/[0.04] hover:bg-bg-tertiary/30 cursor-pointer transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-sm text-txt-primary">{p.address}</div>
                    <div className="text-xs text-txt-tertiary">{p.siteAreaSqm.toLocaleString()} m²</div>
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={p.type} type="property" propertyType={p.type} /></td>
                  <td className="px-5 py-3 text-sm text-txt-secondary">{p.suburb}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-bg-quaternary rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.occupancyRate}%`, backgroundColor: propertyTypeColors[p.type] }} />
                      </div>
                      <span className="text-xs text-txt-secondary">{p.occupancyRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-sm font-mono text-txt-primary">${p.revenueMonthly.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
