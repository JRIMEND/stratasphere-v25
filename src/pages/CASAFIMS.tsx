import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Shield, Radio, FileCheck, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

// Mock CASA/FIMS data
const fleet = [
  { id: 'DR-001', model: 'DJI Matrice 300 RTK', serial: 'SN-789456', weight: 6.3, registration: 'CASA-REG-2025-001', expiry: '2025-12-15', status: 'active', repl: 'Josh Ryan', reoc: 'REOC-QLD-2024-089' },
  { id: 'DR-002', model: 'DJI Mavic 3 Enterprise', serial: 'SN-456123', weight: 0.92, registration: 'CASA-REG-2025-002', expiry: '2026-03-20', status: 'active', repl: 'Sarah Chen', reoc: 'REOC-QLD-2024-089' },
  { id: 'DR-003', model: 'Autel EVO Max 4T', serial: 'SN-321789', weight: 1.6, registration: 'CASA-REG-2024-015', expiry: '2025-01-30', status: 'expiring', repl: 'Josh Ryan', reoc: 'REOC-QLD-2024-089' },
];

const airspaceAuths = [
  { id: 'AAA-001', location: 'Brisbane CBD', altitude: '120m AGL', duration: '2 hours', date: '2025-01-20', status: 'approved', type: 'Commercial Survey' },
  { id: 'AAA-002', location: 'Surfers Paradise', altitude: '90m AGL', duration: '4 hours', date: '2025-01-22', status: 'pending', type: 'Real Estate Photography' },
  { id: 'AAA-003', location: 'Mooloolaba', altitude: '60m AGL', duration: '1 hour', date: '2025-01-25', status: 'approved', type: 'Tourism Mapping' },
];

const complianceItems = [
  { id: '1', category: 'CASA ReOC', requirement: 'Remote Operator Certificate valid', status: 'compliant', regulation: 'CASR Part 101' },
  { id: '2', category: 'RePL', requirement: 'Remote Pilot Licence current', status: 'compliant', regulation: 'CASR Part 101' },
  { id: '3', category: 'Registration', requirement: 'All drones registered with CASA', status: 'review', regulation: 'CASR Part 101.075' },
  { id: '4', category: 'Insurance', requirement: 'Public liability insurance ($20M)', status: 'compliant', regulation: 'CASA Advisory' },
  { id: '5', category: 'FIMS Ready', requirement: 'FIMS integration completed', status: 'pending', regulation: 'Airservices Australia' },
  { id: '6', category: 'Remote ID', requirement: 'Remote ID broadcast enabled', status: 'compliant', regulation: 'CASR Part 101.372' },
  { id: '7', category: 'SORA', requirement: 'SORA assessment for operations', status: 'review', regulation: 'CASR Part 101' },
  { id: '8', category: 'Privacy Act', requirement: 'Privacy compliance for imagery', status: 'compliant', regulation: 'Privacy Act 1988' },
];

export default function CASAFIMS() {
  const [tab, setTab] = useState<'fleet' | 'airspace' | 'compliance'>('fleet');

  const compliantCount = complianceItems.filter(c => c.status === 'compliant').length;
  const complianceRate = Math.round((compliantCount / complianceItems.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-medium text-txt-primary">CASA / FIMS Integration</h2>
        <p className="text-sm text-txt-secondary">Drone compliance, airspace management & FIMS readiness</p>
      </div>

      {/* FIMS Readiness Banner */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-volumetric/10 to-accent/10 border border-volumetric/20 rounded-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-volumetric/20 flex items-center justify-center">
              <Plane className="w-6 h-6 text-volumetric" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-txt-primary">FIMS Readiness Score</h3>
              <p className="text-xs text-txt-secondary">Flight Information Management System — Airservices Australia</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-heading font-medium" style={{ color: complianceRate >= 80 ? '#10B981' : complianceRate >= 50 ? '#F59E0B' : '#EF4444' }}>
              {complianceRate}%
            </div>
            <p className="text-xs text-txt-tertiary">{compliantCount}/{complianceItems.length} requirements met</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06]">
        {([
          { id: 'fleet' as const, label: 'Drone Fleet', icon: Plane },
          { id: 'airspace' as const, label: 'Airspace Authorizations', icon: Radio },
          { id: 'compliance' as const, label: 'Compliance', icon: Shield },
        ]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative ${tab === t.id ? 'text-accent' : 'text-txt-secondary hover:text-txt-primary'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
            {tab === t.id && <motion.div layoutId="casaTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        ))}
      </div>

      {/* Fleet Tab */}
      {tab === 'fleet' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fleet.map((drone, i) => (
              <motion.div key={drone.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-bg-secondary border border-white/[0.06] rounded-card p-5 hover:border-accent/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-volumetric/10 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-volumetric" />
                  </div>
                  <StatusBadge status={drone.status} type={drone.status === 'active' ? 'success' : 'warning'} />
                </div>
                <h3 className="text-sm font-medium text-txt-primary">{drone.model}</h3>
                <div className="space-y-1 mt-2 text-xs text-txt-secondary">
                  <p>Serial: {drone.serial}</p>
                  <p>Weight: {drone.weight}kg</p>
                  <p>Registration: {drone.registration}</p>
                  <p>RePL Holder: {drone.repl}</p>
                  <p>ReOC: {drone.reoc}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-txt-tertiary">Expiry</span>
                  <span className={`text-xs font-medium ${new Date(drone.expiry) < new Date('2025-06-01') ? 'text-warning' : 'text-success'}`}>
                    {new Date(drone.expiry).toLocaleDateString('en-AU')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Airspace Tab */}
      {tab === 'airspace' && (
        <div className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Reference</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Location</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Altitude</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-txt-tertiary">Status</th>
              </tr>
            </thead>
            <tbody>
              {airspaceAuths.map(a => (
                <tr key={a.id} className="border-b border-white/[0.04] hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-txt-primary">{a.id}</td>
                  <td className="px-5 py-3 text-sm text-txt-secondary">{a.location}</td>
                  <td className="px-5 py-3 text-xs text-txt-secondary">{a.type}</td>
                  <td className="px-5 py-3 text-xs text-txt-primary">{a.altitude}</td>
                  <td className="px-5 py-3 text-xs text-txt-secondary">{new Date(a.date).toLocaleDateString('en-AU')}</td>
                  <td className="px-5 py-3"><StatusBadge status={a.status} type={a.status === 'approved' ? 'success' : 'warning'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compliance Tab */}
      {tab === 'compliance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-bg-secondary border border-white/[0.06] rounded-card p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                item.status === 'compliant' ? 'bg-success/10' : item.status === 'pending' ? 'bg-warning/10' : 'bg-info/10'
              }`}>
                {item.status === 'compliant' ? <CheckCircle2 className="w-5 h-5 text-success" /> :
                 item.status === 'pending' ? <Clock className="w-5 h-5 text-warning" /> :
                 <AlertTriangle className="w-5 h-5 text-info" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-txt-primary">{item.category}</p>
                  <StatusBadge status={item.status} type={item.status === 'compliant' ? 'success' : item.status === 'pending' ? 'warning' : 'info'} />
                </div>
                <p className="text-xs text-txt-secondary">{item.requirement}</p>
                <p className="text-[11px] text-txt-tertiary mt-1">{item.regulation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
