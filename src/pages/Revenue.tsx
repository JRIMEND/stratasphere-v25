import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, BarChart3, Zap } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { portfolioChartData, properties } from '@/data/demoData';

const revenueStreams = [
  { id: 'rent', label: 'Traditional Rent', monthly: 165900, growth: 4.2, color: '#14B8A6' },
  { id: 'airspace', label: 'Airspace Rights (D3)', monthly: 12500, growth: 18.5, color: '#A78BFA' },
  { id: '5g', label: '5G Tower Leases', monthly: 8400, growth: 32.0, color: '#3B82F6' },
  { id: 'solar', label: 'Solar Feed-in', monthly: -2100, growth: 8.1, color: '#10B981' },
  { id: 'ev', label: 'EV Charging', monthly: 5400, growth: 45.2, color: '#F59E0B' },
  { id: 'drone', label: 'Drone Corridors', monthly: 3200, growth: 120.0, color: '#EC4899' },
];

const byProperty = properties.map(p => ({
  name: p.address.split(',')[0],
  revenue: p.revenueMonthly,
  occupancy: p.occupancyRate,
  type: p.type,
})).sort((a, b) => b.revenue - a.revenue);

export default function Revenue() {
  const [tab, setTab] = useState<'overview' | 'streams' | 'properties'>('overview');
  const totalTraditional = revenueStreams.filter(r => r.id === 'rent').reduce((s, r) => s + r.monthly, 0);
  const totalVolumetric = revenueStreams.filter(r => r.id !== 'rent').reduce((s, r) => s + r.monthly, 0);
  const totalMonthly = totalTraditional + totalVolumetric;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-medium text-txt-primary">Revenue Explorer</h2>
        <p className="text-sm text-txt-secondary">Traditional + volumetric revenue analytics</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Monthly Revenue" value={`$${totalMonthly.toLocaleString()}`} change={8.7}
          icon={<DollarSign className="w-5 h-5" />} />
        <MetricCard title="Traditional (D1-D2)" value={`$${totalTraditional.toLocaleString()}`} change={4.2}
          icon={<BarChart3 className="w-5 h-5" />} />
        <MetricCard title="Volumetric (D3-D6)" value={`$${totalVolumetric.toLocaleString()}`} change={32.4}
          icon={<Zap className="w-5 h-5" />} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06]">
        {(['overview', 'streams', 'properties'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors relative ${tab === t ? 'text-accent' : 'text-txt-secondary hover:text-txt-primary'}`}>
            {t}
            {tab === t && <motion.div layoutId="revTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
          <h3 className="text-lg font-heading font-medium text-txt-primary mb-4">Revenue Trend (13 months)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={portfolioChartData}>
              <defs>
                <linearGradient id="tGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/><stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/></linearGradient>
                <linearGradient id="vGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/><stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" tick={{ fill: '#52525B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#52525B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#EAEAEA' }} itemStyle={{ color: '#A1A1AA' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
              <Area type="monotone" dataKey="traditional" stackId="1" stroke="#14B8A6" strokeWidth={2} fill="url(#tGrad2)" name="Traditional" />
              <Area type="monotone" dataKey="volumetric" stackId="1" stroke="#A78BFA" strokeWidth={2} fill="url(#vGrad2)" name="Volumetric" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {tab === 'streams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {revenueStreams.map((stream, i) => (
            <motion.div key={stream.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-bg-secondary border border-white/[0.06] rounded-card p-5 hover:border-accent/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stream.color + '1A' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: stream.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-txt-primary">{stream.label}</p>
                  <p className="text-xs text-success">+{stream.growth}% growth</p>
                </div>
              </div>
              <p className="text-2xl font-heading font-medium text-txt-primary">${stream.monthly.toLocaleString()}
                <span className="text-sm text-txt-secondary">/mo</span>
              </p>
              <p className="text-xs text-txt-tertiary mt-1">Annual: ${(stream.monthly * 12).toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'properties' && (
        <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
          <h3 className="text-lg font-heading font-medium text-txt-primary mb-4">Revenue by Property</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={byProperty} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis type="number" tick={{ fill: '#52525B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#A1A1AA', fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
              <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', fontSize: '12px' }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Monthly Revenue']} />
              <Bar dataKey="revenue" fill="#14B8A6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
