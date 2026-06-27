import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, FileSignature, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

// 3D Dimensions D1-D6
const dimensions = [
  { id: 'D1', name: 'Surface (0m)', description: 'Ground-level surface rights', status: 'registered', value: 12500000 },
  { id: 'D2', name: 'Building Envelope (0-30m)', description: 'Structure and built form', status: 'registered', value: 8500000 },
  { id: 'D3', name: 'Low Airspace (30-120m)', description: 'Drone corridors, 5G, advertising', status: 'registered', value: 4200000 },
  { id: 'D4', name: 'High Airspace (120-600m)', description: 'Aviation corridors, eVTOL routes', status: 'examining', value: 2800000 },
  { id: 'D5', name: 'Subsurface (0 to -10m)', description: 'Underground services, parking', status: 'registered', value: 3100000 },
  { id: 'D6', name: 'Deep Subsurface (-10 to -50m)', description: 'Tunnels, geothermal, storage', status: 'lodged', value: 1500000 },
];

const titlePlans = [
  { id: 'TP-2025-001', property: 'Lot 45 Brisbane Terrace', type: 'Volumetric', status: 'registered', date: '2024-06-15', value: 12500000 },
  { id: 'TP-2025-002', property: '42 Park Avenue', type: 'Strata', status: 'registered', date: '2023-11-20', value: 8500000 },
  { id: 'TP-2024-089', property: 'Lot 45 Brisbane Terrace', type: 'Amendment', status: 'examining', date: '2025-01-10', value: 2800000 },
];

const enforcementActions = [
  { id: 'EA-001', type: 'Encroachment Notice', description: 'Adjacent developer encroached on D3 airspace boundary', status: 'resolved', date: '2024-12-01', value: 45000 },
  { id: 'EA-002', type: 'Boundary Dispute', description: 'Disputed D5 subsurface boundary with neighbouring lot', status: 'active', date: '2025-01-08', value: 120000 },
];

const workflowSteps = [
  { step: 1, label: 'Survey & Prepare', status: 'completed', detail: 'Licensed surveyor prepares 3D survey plan' },
  { step: 2, label: 'Legal Review', status: 'completed', detail: 'Property lawyer reviews volumetric description' },
  { step: 3, label: 'Submit to Titles QLD', status: 'in_progress', detail: 'Lodged via ATS — awaiting examination' },
  { step: 4, label: 'Examination', status: 'pending', detail: 'Titles Queensland examines the plan' },
  { step: 5, label: 'Registration', status: 'pending', detail: 'Title plan registered, 3D rights activated' },
];

export default function Volumetric() {
  const [tab, setTab] = useState<'dimensions' | 'plans' | 'enforcement' | 'workflow'>('dimensions');
  const totalValue = dimensions.reduce((s, d) => s + d.value, 0);

  const tabs = [
    { id: 'dimensions' as const, label: '3D Dimensions', icon: Layers },
    { id: 'plans' as const, label: 'Title Plans', icon: FileSignature },
    { id: 'enforcement' as const, label: 'Enforcement', icon: AlertTriangle },
    { id: 'workflow' as const, label: 'Lodgement', icon: Box },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Volumetric Title Manager</h2>
          <p className="text-sm text-txt-secondary">3D volumetric title lifecycle with Titles Queensland</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-txt-tertiary">Total 3D Value</p>
          <p className="text-xl font-heading font-medium text-volumetric">${(totalValue / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${tab === t.id ? 'text-volumetric' : 'text-txt-secondary hover:text-txt-primary'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
            {tab === t.id && <motion.div layoutId="volTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-volumetric" />}
          </button>
        ))}
      </div>

      {/* Dimensions Tab */}
      {tab === 'dimensions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensions.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-bg-secondary border border-white/[0.06] rounded-card p-5 hover:border-volumetric/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-volumetric bg-volumetric/10 px-2 py-1 rounded">{d.id}</span>
                <StatusBadge status={d.status} type={d.status === 'registered' ? 'success' : d.status === 'examining' ? 'warning' : 'info'} />
              </div>
              <h3 className="text-sm font-medium text-txt-primary mb-1">{d.name}</h3>
              <p className="text-xs text-txt-secondary mb-3">{d.description}</p>
              <div className="pt-3 border-t border-white/[0.06]">
                <p className="text-lg font-heading font-medium text-txt-primary">${(d.value / 1000000).toFixed(1)}M</p>
                <p className="text-[11px] text-txt-tertiary">Estimated value</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Plans Tab */}
      {tab === 'plans' && (
        <div className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Plan Reference</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Property</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Status</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-txt-tertiary">Value</th>
              </tr>
            </thead>
            <tbody>
              {titlePlans.map(p => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-volumetric">{p.id}</td>
                  <td className="px-5 py-3 text-sm text-txt-secondary">{p.property}</td>
                  <td className="px-5 py-3 text-xs text-txt-secondary">{p.type}</td>
                  <td className="px-5 py-3 text-xs text-txt-secondary">{new Date(p.date).toLocaleDateString('en-AU')}</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} type={p.status === 'registered' ? 'success' : 'warning'} /></td>
                  <td className="px-5 py-3 text-right text-sm font-mono text-txt-primary">${p.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Enforcement Tab */}
      {tab === 'enforcement' && (
        <div className="space-y-4">
          {enforcementActions.map((ea, i) => (
            <motion.div key={ea.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-bg-secondary border border-white/[0.06] rounded-card p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-txt-primary">{ea.type}</p>
                    <p className="text-xs text-txt-tertiary">{ea.id} • {new Date(ea.date).toLocaleDateString('en-AU')}</p>
                  </div>
                </div>
                <StatusBadge status={ea.status} type={ea.status === 'resolved' ? 'success' : 'danger'} />
              </div>
              <p className="text-sm text-txt-secondary mt-3">{ea.description}</p>
              <p className="text-sm font-mono text-txt-primary mt-2">${ea.value.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Workflow Tab */}
      {tab === 'workflow' && (
        <div className="max-w-2xl mx-auto">
          <div className="space-y-0">
            {workflowSteps.map((step, i) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.status === 'completed' ? 'bg-success/20 text-success' :
                    step.status === 'in_progress' ? 'bg-accent/20 text-accent' :
                    'bg-bg-quaternary text-txt-tertiary'
                  }`}>
                    {step.status === 'completed' ? <Box className="w-4 h-4" /> : step.step}
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className={`w-0.5 h-12 ${step.status === 'completed' ? 'bg-success/30' : 'bg-bg-quaternary'}`} />
                  )}
                </div>
                <div className={`pb-8 ${step.status === 'in_progress' ? 'opacity-100' : step.status === 'completed' ? 'opacity-80' : 'opacity-50'}`}>
                  <p className="text-sm font-medium text-txt-primary">{step.label}</p>
                  <p className="text-xs text-txt-secondary mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
