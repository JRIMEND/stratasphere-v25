import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface TopBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function TopBar({ onMenuClick, onSearchClick }: TopBarProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const crumbs = location.pathname.split('/').filter(Boolean);
  const title = crumbs.length === 0 ? 'Dashboard' : crumbs[crumbs.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <header className="h-16 bg-bg-secondary/80 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-txt-secondary hover:text-txt-primary">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-heading font-medium text-txt-primary capitalize">{title}</h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-txt-tertiary">
            <span>StrataSphere</span>
            {crumbs.map((crumb, i) => (
              <span key={i}>/ <span className="capitalize">{crumb.replace(/-/g, ' ')}</span></span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary border border-white/[0.06] rounded-md text-txt-tertiary text-sm hover:border-accent/30 hover:text-txt-secondary transition-colors">
          <Search className="w-4 h-4" />
          <span className="text-xs">Search...</span>
          <kbd className="ml-2 px-1.5 py-0.5 bg-bg-quaternary rounded text-[10px] font-mono">⌘K</kbd>
        </button>

        <button onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 text-txt-secondary hover:text-txt-primary hover:bg-bg-tertiary rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/[0.06]">
          <div className="hidden md:block text-right">
            <div className="text-sm text-txt-primary">{user?.firstName} {user?.lastName}</div>
            <div className="text-[11px] text-txt-tertiary capitalize">{user?.role}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-sm font-medium text-accent">{(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
