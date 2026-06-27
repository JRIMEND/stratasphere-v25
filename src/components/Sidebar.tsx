import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Building2, Home, Store, Tractor,
  Hotel, Factory, Briefcase, Box, Plane, Wrench, Users,
  FileText, Zap, Building, ClipboardCheck, TrendingUp, Settings,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { propertyTypeColors } from '@/types';
import type { PropertyType } from '@/types';

const navGroups = [
  { title: 'Portfolio', items: [
    { to: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { to: '/properties', icon: Building2, label: 'Properties' },
  ]},
  { title: 'Portals', items: [
    { to: '/portals/balance', icon: Box, label: 'Balance Lot', propType: 'balance' as PropertyType },
    { to: '/portals/apartment', icon: Hotel, label: 'Apartment', propType: 'apartment' as PropertyType },
    { to: '/portals/retail', icon: Store, label: 'Retail', propType: 'retail' as PropertyType },
    { to: '/portals/farm', icon: Tractor, label: 'Rural / Farm', propType: 'farm' as PropertyType },
    { to: '/portals/residential', icon: Home, label: 'Residential', propType: 'residential' as PropertyType },
    { to: '/portals/commercial', icon: Briefcase, label: 'Commercial', propType: 'commercial' as PropertyType },
    { to: '/portals/industrial', icon: Factory, label: 'Industrial', propType: 'industrial' as PropertyType },
  ]},
  { title: 'Property Mgmt', items: [
    { to: '/tenants', icon: Users, label: 'Tenants' },
    { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
    { to: '/leasing', icon: FileText, label: 'Leasing' },
    { to: '/utilities', icon: Zap, label: 'Utilities' },
    { to: '/body-corporate', icon: Building, label: 'Body Corporate' },
  ]},
  { title: 'Intelligence', items: [
    { to: '/revenue', icon: TrendingUp, label: 'Revenue Explorer' },
    { to: '/compliance', icon: ClipboardCheck, label: 'Compliance' },
  ]},
  { title: 'Specialist', items: [
    { to: '/casa-fims', icon: Plane, label: 'CASA / FIMS' },
    { to: '/volumetric', icon: Box, label: 'Volumetric Titles' },
  ]},
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose, collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Box className="w-4 h-4 text-bg-primary" />
          </div>
          {!collapsed && <span className="font-display text-lg tracking-wider text-accent">STRATASPHERE</span>}
        </div>
        <button onClick={onToggleCollapse}
          className="hidden lg:flex text-txt-tertiary hover:text-txt-primary transition-colors">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {navGroups.map(group => (
          <div key={group.title}>
            {!collapsed && (
              <div className="px-5 mb-2 text-[11px] font-semibold uppercase tracking-wider text-txt-tertiary">
                {group.title}
              </div>
            )}
            {group.items.map(item => {
              const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
              const color = 'propType' in item ? propertyTypeColors[item.propType!] : undefined;
              return (
                <NavLink key={item.to} to={item.to}
                  onClick={() => { if (window.innerWidth < 1024) onMobileClose(); }}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-150 relative group ${
                    isActive ? 'text-accent bg-gradient-to-r from-accent/10 to-transparent' : 'text-txt-secondary hover:text-txt-primary hover:bg-bg-tertiary/50'
                  }`}
                  style={isActive ? { borderLeft: `3px solid ${color || '#14B8A6'}` } : { borderLeft: '3px solid transparent' }}>
                  <item.icon className="w-[18px] h-[18px] shrink-0" style={color ? { color } : undefined} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06] p-4">
        <NavLink to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-txt-secondary hover:text-txt-primary hover:bg-bg-tertiary/50 rounded-lg transition-colors">
          <Settings className="w-[18px] h-[18px]" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-txt-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors mt-1">
          <LogOut className="w-[18px] h-[18px]" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onMobileClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[260px] bg-bg-secondary border-r border-white/[0.06] z-50 lg:hidden">
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className={`hidden lg:block h-screen bg-bg-secondary border-r border-white/[0.06] transition-all duration-300 shrink-0 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
        {sidebarContent}
      </aside>
    </>
  );
}
