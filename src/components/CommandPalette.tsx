import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const commands = [
  { label: 'Dashboard', path: '/dashboard', category: 'Navigation' },
  { label: 'Properties', path: '/properties', category: 'Navigation' },
  { label: 'Tenants', path: '/tenants', category: 'Property Management' },
  { label: 'Maintenance', path: '/maintenance', category: 'Property Management' },
  { label: 'Leasing', path: '/leasing', category: 'Property Management' },
  { label: 'Utilities', path: '/utilities', category: 'Property Management' },
  { label: 'Body Corporate', path: '/body-corporate', category: 'Property Management' },
  { label: 'CASA / FIMS', path: '/casa-fims', category: 'Specialist' },
  { label: 'Volumetric Titles', path: '/volumetric', category: 'Specialist' },
  { label: 'Revenue Explorer', path: '/revenue', category: 'Intelligence' },
  { label: 'Compliance', path: '/compliance', category: 'Intelligence' },
  { label: 'Settings', path: '/settings', category: 'System' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = query.trim() === '' ? commands : commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && filtered[selected]) {
        navigate(filtered[selected].path);
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-[20vh]"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-bg-secondary border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <Search className="w-5 h-5 text-txt-tertiary" />
              <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search pages, modules..."
                className="flex-1 bg-transparent text-txt-primary placeholder-txt-tertiary outline-none text-sm" />
              <kbd className="px-1.5 py-0.5 bg-bg-quaternary rounded text-[10px] font-mono text-txt-tertiary">ESC</kbd>
            </div>
            <div className="max-h-[320px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-txt-tertiary text-sm">No results found</div>
              )}
              {filtered.map((cmd, i) => (
                <button key={cmd.path}
                  onClick={() => { navigate(cmd.path); onClose(); }}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    i === selected ? 'bg-accent/10 text-accent' : 'text-txt-secondary hover:bg-bg-tertiary/50'
                  }`}>
                  <span>{cmd.label}</span>
                  <span className={`text-xs ${i === selected ? 'text-accent/60' : 'text-txt-tertiary'}`}>{cmd.category}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
