import { motion } from 'framer-motion';
import { Shield, ClipboardCheck, AlertTriangle, CheckCircle2, Clock, FileText, Scale, Plane, Building } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

const complianceCategories = [
  {
    title: 'Property Legislation',
    icon: Building,
    items: [
      { id: '1', requirement: 'Land Title Act 1994 — Volumetric registration compliance', status: 'compliant', risk: 'low', nextReview: '2025-07-01' },
      { id: '2', requirement: 'Body Corporate and Community Management Act 1997', status: 'compliant', risk: 'low', nextReview: '2025-06-15' },
      { id: '3', requirement: 'Residential Tenancies and Rooming Accommodation Act 2008', status: 'review', risk: 'medium', nextReview: '2025-02-01' },
      { id: '4', requirement: 'Property Occupations Act 2014', status: 'compliant', risk: 'low', nextReview: '2025-08-01' },
    ]
  },
  {
    title: 'Aviation & Drone',
    icon: Plane,
    items: [
      { id: '5', requirement: 'CASR Part 101 — Unmanned Aircraft', status: 'compliant', risk: 'low', nextReview: '2025-12-15' },
      { id: '6', requirement: 'ReOC (Remote Operator Certificate) valid', status: 'compliant', risk: 'low', nextReview: '2026-01-20' },
      { id: '7', requirement: 'RePL (Remote Pilot Licence) current', status: 'compliant', risk: 'low', nextReview: '2025-11-30' },
      { id: '8', requirement: 'FIMS integration readiness', status: 'pending', risk: 'high', nextReview: '2025-03-01' },
      { id: '9', requirement: 'Remote ID compliance', status: 'compliant', risk: 'medium', nextReview: '2025-09-01' },
    ]
  },
  {
    title: 'Privacy & Data',
    icon: FileText,
    items: [
      { id: '10', requirement: 'Privacy Act 1988 — Collection notices', status: 'compliant', risk: 'low', nextReview: '2025-06-01' },
      { id: '11', requirement: 'Privacy Act 2025 — AI/Drone imagery', status: 'review', risk: 'high', nextReview: '2025-04-01' },
      { id: '12', requirement: 'Notifiable Data Breaches scheme', status: 'compliant', risk: 'medium', nextReview: '2025-07-01' },
    ]
  },
  {
    title: 'Building & Safety',
    icon: Shield,
    items: [
      { id: '13', requirement: 'Building Fire Safety Regulation 2008', status: 'compliant', risk: 'medium', nextReview: '2025-06-01' },
      { id: '14', requirement: 'Work Health and Safety Act 2011', status: 'compliant', risk: 'medium', nextReview: '2025-05-15' },
      { id: '15', requirement: 'Electrical Safety Act 2002', status: 'review', risk: 'high', nextReview: '2025-02-15' },
    ]
  },
];

export default function Compliance() {
  const allItems = complianceCategories.flatMap(c => c.items);
  const compliantCount = allItems.filter(i => i.status === 'compliant').length;
  const complianceRate = Math.round((compliantCount / allItems.length) * 100);
  const overdueCount = allItems.filter(i => i.status !== 'compliant' && new Date(i.nextReview) < new Date()).length;
  const highRiskCount = allItems.filter(i => i.risk === 'high' && i.status !== 'compliant').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-medium text-txt-primary">Compliance Dashboard</h2>
        <p className="text-sm text-txt-secondary">QLD regulatory compliance across all dimensions</p>
      </div>

      {/* Score Card */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#222" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={complianceRate >= 80 ? '#10B981' : complianceRate >= 60 ? '#F59E0B' : '#EF4444'}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${complianceRate * 2.64} ${264 - complianceRate * 2.64}`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-heading font-medium text-txt-primary">{complianceRate}%</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-txt-primary">Overall Compliance Score</h3>
            <p className="text-sm text-txt-secondary">{compliantCount} of {allItems.length} requirements compliant</p>
            <div className="flex gap-4 mt-3">
              {overdueCount > 0 && <span className="px-2 py-1 bg-danger/10 text-danger text-xs rounded-full">{overdueCount} Overdue</span>}
              {highRiskCount > 0 && <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">{highRiskCount} High Risk</span>}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="space-y-6">
        {complianceCategories.map((cat, ci) => {
          const Icon = cat.icon;
          const catCompliant = cat.items.filter(i => i.status === 'compliant').length;
          return (
            <motion.div key={cat.title} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: ci * 0.1 }}
              className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                <Icon className="w-5 h-5 text-accent" />
                <h3 className="text-sm font-medium text-txt-primary">{cat.title}</h3>
                <span className="ml-auto text-xs text-txt-tertiary">{catCompliant}/{cat.items.length} compliant</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {cat.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-3 hover:bg-bg-tertiary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      {item.status === 'compliant' ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> :
                       item.status === 'pending' ? <Clock className="w-4 h-4 text-warning shrink-0" /> :
                       <AlertTriangle className="w-4 h-4 text-info shrink-0" />}
                      <span className="text-sm text-txt-secondary">{item.requirement}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={item.risk} type={item.risk === 'high' ? 'danger' : item.risk === 'medium' ? 'warning' : 'success'} />
                      <span className="text-[11px] text-txt-tertiary">{new Date(item.nextReview).toLocaleDateString('en-AU')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
