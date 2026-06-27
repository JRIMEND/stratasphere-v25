import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Users, Wrench, FileText, Zap, Building, TrendingUp, ClipboardCheck, Brain } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { properties, tenants, maintenanceRequests, leases, utilityConnections, bodyCorporates } from '@/data/demoData';
import { propertyTypeColors } from '@/types';
import type { PropertyType } from '@/types';

const typeLabels: Record<PropertyType, string> = {
  balance: 'Balance Lot', apartment: 'Apartment', retail: 'Retail',
  farm: 'Rural / Farm', residential: 'Residential', commercial: 'Commercial', industrial: 'Industrial'
};

export default function Portal() {
  const { type } = useParams<{ type: string }>();
  const propertyType = (type as PropertyType) || 'balance';
  const color = propertyTypeColors[propertyType];
  const label = typeLabels[propertyType] || propertyType;

  const typeProps = properties.filter(p => p.type === propertyType);
  const typeTenants = tenants.filter(t => typeProps.some(p => p.id === t.propertyId));
  const typeMaint = maintenanceRequests.filter(m => typeProps.some(p => p.id === m.propertyId));
  const typeLeases = leases.filter(l => typeProps.some(p => p.id === l.propertyId));
  const typeUtils = utilityConnections.filter(u => typeProps.some(p => p.id === u.propertyId));
  const typeBC = bodyCorporates.filter(b => typeProps.some(p => p.id === b.propertyId));

  const totalRevenue = typeProps.reduce((s, p) => s + p.revenueMonthly, 0);
  const avgOcc = typeProps.length > 0 ? typeProps.reduce((s, p) => s + p.occupancyRate, 0) / typeProps.length : 0;
  const openMaint = typeMaint.filter(m => m.status !== 'completed' && m.status !== 'closed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '1A' }}>
            <Box className="w-7 h-7" style={{ color }} />
          </div>
          <div>
            <StatusBadge status={propertyType} type="property" propertyType={propertyType} />
            <h1 className="text-xl font-heading font-medium text-txt-primary mt-1">{label} Portal</h1>
            <p className="text-sm text-txt-secondary">{typeProps.length} properties • {typeTenants.length} tenants</p>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Properties" value={typeProps.length} icon={<Box className="w-5 h-5" />} />
        <MetricCard title="Occupancy" value={`${avgOcc.toFixed(1)}`} suffix="%" icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Monthly Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<TrendingUp className="w-5 h-5" />} />
        <MetricCard title="Open Work Orders" value={openMaint} icon={<Wrench className="w-5 h-5" />} />
      </div>

      {/* Property List */}
      <div className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-medium text-txt-primary">Properties</h3>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {typeProps.map(p => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4 hover:bg-bg-tertiary/30 transition-colors">
              <div>
                <p className="text-sm text-txt-primary">{p.address}</p>
                <p className="text-xs text-txt-secondary">{p.suburb}, {p.state} {p.postcode}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-txt-secondary">
                  <Users className="w-3 h-3" /> {tenants.filter(t => t.propertyId === p.id).length}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-txt-secondary">
                  <Wrench className="w-3 h-3" /> {maintenanceRequests.filter(m => m.propertyId === p.id).length}
                </div>
                <span className="text-sm font-mono text-txt-primary">${p.revenueMonthly.toLocaleString()}</span>
              </div>
            </div>
          ))}
          {typeProps.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-txt-secondary">No {label.toLowerCase()} properties yet</div>
          )}
        </div>
      </div>

      {/* Tenants & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-5">
          <h3 className="text-sm font-medium text-txt-primary mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> Tenants</h3>
          <div className="space-y-2">
            {typeTenants.slice(0, 4).map(t => (
              <div key={t.id} className="flex items-center justify-between p-2 bg-bg-tertiary/30 rounded">
                <span className="text-xs text-txt-secondary">{t.name}</span>
                <StatusBadge status={t.rentStatus} type={t.rentStatus === 'overdue' ? 'danger' : t.rentStatus === 'due' ? 'warning' : 'success'} />
              </div>
            ))}
            {typeTenants.length === 0 && <p className="text-xs text-txt-tertiary text-center py-4">No tenants</p>}
          </div>
        </div>

        <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-5">
          <h3 className="text-sm font-medium text-txt-primary mb-3 flex items-center gap-2"><Wrench className="w-4 h-4 text-warning" /> Recent Maintenance</h3>
          <div className="space-y-2">
            {typeMaint.slice(0, 4).map(m => (
              <div key={m.id} className="flex items-center justify-between p-2 bg-bg-tertiary/30 rounded">
                <span className="text-xs text-txt-secondary truncate max-w-[200px]">{m.title}</span>
                <StatusBadge status={m.status} type={m.priority === 'emergency' ? 'danger' : 'info'} />
              </div>
            ))}
            {typeMaint.length === 0 && <p className="text-xs text-txt-tertiary text-center py-4">No work orders</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
