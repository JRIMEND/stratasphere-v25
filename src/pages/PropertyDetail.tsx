import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, Maximize } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Section } from '@/components/common/Section';
import { properties, tenants, maintenanceRequests, leases, utilityConnections, bodyCorporates } from '@/data/demoData';
import { propertyTypeColors } from '@/types';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find(p => p.id === id);
  if (!property) return <div className="text-txt-secondary">Property not found</div>;

  const color = propertyTypeColors[property.type];
  const propTenants = tenants.filter(t => t.propertyId === id);
  const propMaintenance = maintenanceRequests.filter(m => m.propertyId === id);
  const propUtilities = utilityConnections.filter(u => u.propertyId === id);
  const propBC = bodyCorporates.find(b => b.propertyId === id);

  return (
    <div className="space-y-6">
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '1A' }}>
              <Building2 className="w-7 h-7" style={{ color }} />
            </div>
            <div>
              <StatusBadge status={property.type} type="property" propertyType={property.type} />
              <h1 className="text-xl font-heading font-medium text-txt-primary mt-2">{property.address}</h1>
              <p className="text-sm text-txt-secondary flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {property.suburb}, {property.state} {property.postcode}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-medium" style={{ color }}>${property.revenueMonthly.toLocaleString()}<span className="text-sm text-txt-secondary">/mo</span></div>
            <div className="text-xs text-txt-tertiary mt-1">{property.occupancyRate}% occupied</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/[0.06]">
          {[
            { label: 'Year Built', value: property.yearBuilt.toString(), icon: Calendar },
            { label: 'Floors', value: property.floors.toString(), icon: Maximize },
            { label: 'Site Area', value: `${property.siteAreaSqm.toLocaleString()} m²`, icon: MapPin },
            { label: 'Lot/Plan', value: property.lotPlan || 'N/A', icon: Building2 },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="w-4 h-4 text-txt-tertiary" />
              <div>
                <p className="text-[11px] text-txt-tertiary">{s.label}</p>
                <p className="text-sm text-txt-primary">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {propTenants.length > 0 && (
        <Section title={`Tenants (${propTenants.length})`}>
          <div className="space-y-2">
            {propTenants.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
                <div>
                  <p className="text-sm text-txt-primary">{t.name}</p>
                  <p className="text-xs text-txt-secondary">{t.unit}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-txt-primary">${t.rentWeekly}/wk</span>
                  <StatusBadge status={t.rentStatus} type={t.rentStatus === 'overdue' ? 'danger' : t.rentStatus === 'due' ? 'warning' : 'success'} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {propMaintenance.length > 0 && (
        <Section title={`Maintenance (${propMaintenance.length})`}>
          <div className="space-y-2">
            {propMaintenance.map(m => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
                <div>
                  <p className="text-sm text-txt-primary">{m.title}</p>
                  <p className="text-xs text-txt-secondary">{m.assignedTo || 'Unassigned'} • {m.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  {m.estimatedCost && <span className="text-xs font-mono text-txt-secondary">${m.estimatedCost}</span>}
                  <StatusBadge status={m.status} type={m.priority === 'emergency' ? 'danger' : m.priority === 'urgent' ? 'warning' : 'info'} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {propUtilities.length > 0 && (
        <Section title={`Utilities (${propUtilities.length})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {propUtilities.map(u => (
              <div key={u.id} className="p-3 bg-bg-tertiary/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-txt-secondary capitalize">{u.type.replace('_', ' ')}</span>
                  <StatusBadge status={u.status} type="success" />
                </div>
                <p className="text-sm text-txt-primary">{u.provider}</p>
                {u.monthlyCost && <p className="text-xs font-mono text-txt-secondary">${u.monthlyCost.toFixed(2)}/mo</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {propBC && (
        <Section title="Body Corporate">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-bg-tertiary/30 rounded-lg">
              <p className="text-xs text-txt-tertiary mb-1">Scheme</p>
              <p className="text-sm text-txt-primary">{propBC.schemeName}</p>
              <p className="text-xs text-txt-secondary">{propBC.ctsNumber}</p>
            </div>
            <div className="p-4 bg-bg-tertiary/30 rounded-lg">
              <p className="text-xs text-txt-tertiary mb-1">Levies</p>
              <p className="text-sm text-txt-primary">Admin: ${propBC.adminLevy}/mo</p>
              <p className="text-xs text-txt-secondary">Sinking: ${propBC.sinkingFund}/mo</p>
            </div>
            <div className="p-4 bg-bg-tertiary/30 rounded-lg">
              <p className="text-xs text-txt-tertiary mb-1">Insurance</p>
              <p className="text-sm text-txt-primary">{propBC.insuranceInsurer}</p>
              <p className="text-xs text-txt-secondary">Expires: {new Date(propBC.insuranceExpiry).toLocaleDateString('en-AU')}</p>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
