import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Users, Wrench, TrendingUp, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { properties, maintenanceRequests, tenants, portfolioChartData, activityFeed } from '@/data/demoData';
import { propertyTypeColors } from '@/types';
import { useNavigate } from 'react-router-dom';

const pieData = Object.entries(propertyTypeColors).map(([type, color]) => ({
  name: type.charAt(0).toUpperCase() + type.slice(1),
  value: properties.filter(p => p.type === type).length,
  color
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const totalRevenue = properties.reduce((s, p) => s + p.revenueMonthly, 0);
  const avgOccupancy = properties.reduce((s, p) => s + p.occupancyRate, 0) / properties.length;
  const openOrders = maintenanceRequests.filter(m => m.status !== 'completed' && m.status !== 'closed').length;
  const overdueRent = tenants.filter(t => t.rentStatus === 'overdue').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Total Properties" value={properties.length} change={12.5}
          icon={<Building2 className="w-5 h-5" />} />
        <MetricCard title="Occupancy Rate" value={avgOccupancy.toFixed(1)} suffix="%" change={2.3}
          icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Monthly Revenue" value={totalRevenue} prefix="$" change={8.7}
          icon={<TrendingUp className="w-5 h-5" />} />
        <MetricCard title="Open Work Orders" value={openOrders} change={-3}
          icon={<Wrench className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-bg-secondary border border-white/[0.06] rounded-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-heading font-medium text-txt-primary">Portfolio Revenue</h3>
              <p className="text-xs text-txt-tertiary">Traditional + Volumetric income</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Traditional</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-volumetric" /> Volumetric</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={portfolioChartData}>
              <defs>
                <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/><stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/></linearGradient>
                <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/><stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" tick={{ fill: '#52525B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#52525B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#EAEAEA' }} itemStyle={{ color: '#A1A1AA' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
              <Area type="monotone" dataKey="traditional" stackId="1" stroke="#14B8A6" strokeWidth={2} fill="url(#tGrad)" />
              <Area type="monotone" dataKey="volumetric" stackId="1" stroke="#A78BFA" strokeWidth={2} fill="url(#vGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
          <h3 className="text-lg font-heading font-medium text-txt-primary mb-1">Property Types</h3>
          <p className="text-xs text-txt-tertiary mb-6">Portfolio distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.filter(d => d.value > 0).map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-txt-secondary">{d.name}</span>
                <span className="text-txt-tertiary ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-medium text-txt-primary">Activity Feed</h3>
            <span className="text-xs text-txt-tertiary">Last 7 days</span>
          </div>
          <div className="space-y-3">
            {activityFeed.slice(0, 5).map(item => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-bg-tertiary/30 rounded-lg hover:bg-bg-tertiary/60 transition-colors cursor-pointer"
                onClick={() => item.propertyId && navigate(`/properties/${item.propertyId}`)}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  item.type === 'maintenance' ? 'bg-warning/10 text-warning' :
                  item.type === 'rent' ? 'bg-danger/10 text-danger' :
                  item.type === 'compliance' ? 'bg-info/10 text-info' :
                  'bg-success/10 text-success'
                }`}>
                  {item.type === 'maintenance' ? <Wrench className="w-3.5 h-3.5" /> :
                   item.type === 'rent' ? <ArrowDownRight className="w-3.5 h-3.5" /> :
                   item.type === 'compliance' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                   <ArrowUpRight className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-txt-primary truncate">{item.title}</p>
                  <p className="text-xs text-txt-secondary mt-0.5">{item.description}</p>
                  <p className="text-[11px] text-txt-tertiary mt-1">{new Date(item.timestamp).toLocaleDateString('en-AU')}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="space-y-4">
          <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
            <h3 className="text-lg font-heading font-medium text-txt-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Property', icon: Building2, action: () => navigate('/properties') },
                { label: 'New Work Order', icon: Wrench, action: () => navigate('/maintenance') },
                { label: 'Tenant Portal', icon: Users, action: () => navigate('/tenants') },
                { label: 'Revenue Report', icon: TrendingUp, action: () => navigate('/revenue') },
              ].map(a => (
                <button key={a.label} onClick={a.action}
                  className="flex items-center gap-3 p-3 bg-bg-tertiary/50 rounded-lg hover:bg-accent/10 hover:border-accent/20 border border-transparent transition-all text-left">
                  <a.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-txt-secondary">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-medium text-txt-primary">Rent Alerts</h3>
              {overdueRent > 0 && <span className="px-2 py-0.5 bg-danger/10 text-danger text-xs rounded-full">{overdueRent} overdue</span>}
            </div>
            <div className="space-y-2">
              {tenants.filter(t => t.rentStatus === 'overdue' || t.rentStatus === 'due').map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
                  <div>
                    <p className="text-sm text-txt-primary">{t.name}</p>
                    <p className="text-xs text-txt-secondary">{t.unit} — {t.propertyAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-txt-primary">${t.rentWeekly}/wk</p>
                    <StatusBadge status={t.rentStatus} type={t.rentStatus === 'overdue' ? 'danger' : 'warning'} />
                  </div>
                </div>
              ))}
              {overdueRent === 0 && <p className="text-sm text-txt-secondary text-center py-4">All rents up to date</p>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
