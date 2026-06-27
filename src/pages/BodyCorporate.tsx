import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Section } from '@/components/common/Section';
import { bodyCorporates, properties } from '@/data/demoData';

export default function BodyCorporate() {
  const [selectedBC, setSelectedBC] = useState(bodyCorporates[0]?.id || '');
  const bc = bodyCorporates.find(b => b.id === selectedBC) || bodyCorporates[0];
  if (!bc) return <div className="text-txt-secondary">No body corporate data</div>;

  const prop = properties.find(p => p.id === bc.propertyId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Body Corporate Manager</h2>
          <p className="text-sm text-txt-secondary">{bodyCorporates.length} schemes managed</p>
        </div>
        <select value={selectedBC} onChange={e => setSelectedBC(e.target.value)}
          className="px-4 py-2 bg-bg-secondary border border-white/[0.06] rounded-input text-sm text-txt-primary outline-none focus:border-accent">
          {bodyCorporates.map(b => (
            <option key={b.id} value={b.id}>{b.schemeName}</option>
          ))}
        </select>
      </div>

      <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-medium text-txt-primary">{bc.schemeName}</h3>
            <p className="text-sm text-txt-secondary">{bc.ctsNumber} • {bc.lotNumber}</p>
            {prop && <p className="text-xs text-txt-tertiary mt-1">{prop.address}, {prop.suburb}</p>}
          </div>
          <div className="text-right">
            <p className="text-xs text-txt-tertiary">Next AGM</p>
            <p className="text-sm font-medium text-accent">{new Date(bc.nextAgmDate).toLocaleDateString('en-AU')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Admin Levy', value: `$${bc.adminLevy}/mo`, icon: DollarSign },
            { label: 'Sinking Fund', value: `$${bc.sinkingFund}/mo`, icon: TrendingUp },
            { label: 'Insurance', value: bc.insuranceInsurer, icon: Shield },
            { label: 'Unit Entitlement', value: bc.unitEntitlement.toString(), icon: Users },
          ].map(s => (
            <div key={s.label} className="p-3 bg-bg-tertiary/30 rounded-lg">
              <p className="text-[11px] text-txt-tertiary">{s.label}</p>
              <p className="text-sm text-txt-primary">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Committee Members">
          <div className="space-y-2">
            {bc.committeeMembers.map(m => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-accent">{m.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm text-txt-primary">{m.name}</p>
                    <p className="text-xs text-txt-secondary">{m.email}</p>
                  </div>
                </div>
                <span className="text-xs text-txt-tertiary">{m.role}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Active Motions">
          <div className="space-y-2">
            {bc.motions.map(m => (
              <div key={m.id} className="p-3 bg-bg-tertiary/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-txt-primary">{m.title}</p>
                  <StatusBadge status={m.status} type={m.status === 'passed' ? 'success' : m.status === 'open' ? 'info' : 'warning'} />
                </div>
                <p className="text-xs text-txt-secondary mb-2">{m.description}</p>
                {m.status === 'open' && (
                  <div className="flex gap-3 text-xs">
                    <span className="text-success">{m.voteFor} For</span>
                    <span className="text-danger">{m.voteAgainst} Against</span>
                    <span className="text-txt-tertiary">{m.voteAbstain} Abstain</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="By-Laws" defaultOpen={false}>
        <div className="space-y-2">
          {bc.byLaws.map(law => (
            <div key={law.id} className="p-3 bg-bg-tertiary/30 rounded-lg">
              <p className="text-sm font-medium text-txt-primary">{law.title}</p>
              <p className="text-xs text-txt-secondary mt-1">{law.content}</p>
              <p className="text-[11px] text-txt-tertiary mt-1">Effective: {new Date(law.effectiveDate).toLocaleDateString('en-AU')}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Financial Reports" defaultOpen={false}>
        <div className="space-y-2">
          {bc.financialReports.map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
              <div>
                <p className="text-sm text-txt-primary">{r.type}</p>
                <p className="text-xs text-txt-secondary">{r.period}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-txt-tertiary">Income: ${r.totalIncome.toLocaleString()}</p>
                <p className="text-xs text-txt-tertiary">Expenses: ${r.totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function DollarSign(props: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
