interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, prefix = '', suffix = '', icon }: MetricCardProps) {
  const isPositive = (change || 0) >= 0;
  return (
    <div className="bg-bg-secondary border border-white/[0.06] rounded-card p-6 hover:border-accent/20 hover:shadow-[0_0_24px_rgba(20,184,166,0.06)] transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-txt-secondary text-sm">{title}</span>
        <div className="text-accent">{icon}</div>
      </div>
      <div className="text-2xl font-heading font-medium text-txt-primary">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      {change !== undefined && (
        <div className={`mt-2 text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? '+' : ''}{change}% from last month
        </div>
      )}
    </div>
  );
}
