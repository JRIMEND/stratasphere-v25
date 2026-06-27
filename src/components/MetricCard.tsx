import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  warning?: boolean;
  warningSub?: string;
}

export default function MetricCard({ label, value, change, changeLabel = 'vs last month', warning, warningSub }: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;

  let changeColor = 'text-success';
  if (isNegative && !warning) changeColor = 'text-danger';
  if (isNeutral) changeColor = 'text-txt-tertiary';
  if (warning) changeColor = 'text-warning';

  return (
    <div className="bg-bg-secondary border border-white/[0.06] rounded-xl p-5 shadow-card hover:shadow-card-hover hover:border-accent-teal/20 hover:-translate-y-px transition-all duration-200">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-txt-tertiary mb-3">
        {label}
      </p>
      <p className={`font-mono text-[28px] font-medium tracking-tight ${warning ? 'text-warning' : 'text-txt-primary'}`}>
        {value}
      </p>
      {(change !== undefined || warningSub) && (
        <div className="flex items-center gap-2 mt-2">
          {change !== undefined && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${changeColor}`}>
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && !warning && <TrendingDown className="w-3 h-3" />}
              {isNeutral && <Minus className="w-3 h-3" />}
              {change > 0 ? '+' : ''}{change}
            </span>
          )}
          {warningSub && (
            <span className="text-xs text-warning">{warningSub}</span>
          )}
          {changeLabel && change !== undefined && !warningSub && (
            <span className="text-xs text-txt-tertiary">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
