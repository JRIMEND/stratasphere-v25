import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-bg-secondary border border-white/[0.06] rounded-card overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-bg-tertiary/50 transition-colors">
        <h3 className="text-lg font-heading font-medium text-txt-primary">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-txt-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
