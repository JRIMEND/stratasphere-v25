import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  action?: ReactNode;
  className?: string;
}

export default function Section({ title, children, defaultExpanded = true, action, className = '' }: SectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-bg-secondary border border-white/[0.06] rounded-xl shadow-card overflow-hidden ${className}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="font-heading text-lg font-medium text-txt-primary">{title}</h3>
        <div className="flex items-center gap-3">
          {action}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-txt-tertiary" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/[0.06]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
