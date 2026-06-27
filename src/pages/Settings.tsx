import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Database, Palette, Key } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Section } from '@/components/common/Section';

export default function Settings() {
  const { user } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [leaseReminders, setLeaseReminders] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-heading font-medium text-txt-primary">Settings</h2>
        <p className="text-sm text-txt-secondary">Manage your account and platform preferences</p>
      </div>

      {/* Profile */}
      <Section title="Profile">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-xl font-medium text-accent">{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
          </div>
          <div>
            <p className="text-lg font-medium text-txt-primary">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-txt-secondary">{user?.email}</p>
            <p className="text-xs text-txt-tertiary capitalize">{user?.role} Account</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-txt-tertiary mb-1">First Name</label>
            <input defaultValue={user?.firstName}
              className="w-full px-3 py-2 bg-bg-tertiary border border-white/[0.06] rounded-input text-sm text-txt-primary outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-xs text-txt-tertiary mb-1">Last Name</label>
            <input defaultValue={user?.lastName}
              className="w-full px-3 py-2 bg-bg-tertiary border border-white/[0.06] rounded-input text-sm text-txt-primary outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-xs text-txt-tertiary mb-1">Email</label>
            <input defaultValue={user?.email}
              className="w-full px-3 py-2 bg-bg-tertiary border border-white/[0.06] rounded-input text-sm text-txt-primary outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-xs text-txt-tertiary mb-1">Phone</label>
            <input defaultValue="0400 000 000"
              className="w-full px-3 py-2 bg-bg-tertiary border border-white/[0.06] rounded-input text-sm text-txt-primary outline-none focus:border-accent" />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-accent text-bg-primary rounded-button text-sm font-medium hover:bg-accent-hover transition-colors">
          Save Changes
        </button>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" defaultOpen={false}>
        <div className="space-y-3">
          {[
            { label: 'Email Notifications', desc: 'Receive email updates about your properties', value: emailNotifs, set: setEmailNotifs },
            { label: 'Push Notifications', desc: 'Browser push notifications for urgent items', value: pushNotifs, set: setPushNotifs },
            { label: 'Maintenance Alerts', desc: 'Alert when new work orders are created', value: maintenanceAlerts, set: setMaintenanceAlerts },
            { label: 'Lease Reminders', desc: 'Reminders for lease expiries 90/60/30 days out', value: leaseReminders, set: setLeaseReminders },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
              <div>
                <p className="text-sm text-txt-primary">{item.label}</p>
                <p className="text-xs text-txt-secondary">{item.desc}</p>
              </div>
              <button onClick={() => item.set(!item.value)}
                className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? 'bg-accent' : 'bg-bg-quaternary'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${item.value ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section title="Security" defaultOpen={false}>
        <div className="space-y-3">
          <div className="p-3 bg-bg-tertiary/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-accent" />
              <div>
                <p className="text-sm text-txt-primary">Password</p>
                <p className="text-xs text-txt-secondary">Last changed 30 days ago</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-bg-quaternary rounded-lg text-xs text-txt-secondary hover:text-txt-primary transition-colors">
              Change
            </button>
          </div>
          <div className="p-3 bg-bg-tertiary/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-success" />
              <div>
                <p className="text-sm text-txt-primary">Session Encryption</p>
                <p className="text-xs text-txt-secondary">PBKDF2 + AES-256-GCM active</p>
              </div>
            </div>
            <span className="text-xs text-success">Active</span>
          </div>
        </div>
      </Section>

      {/* Integrations */}
      <Section title="Integrations" defaultOpen={false}>
        <div className="space-y-2">
          {[
            { name: 'Titles Queensland ATS', status: 'Connected', icon: Database },
            { name: 'CASA Digital Platform', status: 'Connected', icon: Shield },
            { name: 'FIMS (Airservices)', status: 'Pending', icon: Database },
            { name: 'BOM Weather API', status: 'Connected', icon: Database },
          ].map(int => (
            <div key={int.name} className="flex items-center justify-between p-3 bg-bg-tertiary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <int.icon className="w-4 h-4 text-accent" />
                <p className="text-sm text-txt-primary">{int.name}</p>
              </div>
              <span className={`text-xs ${int.status === 'Connected' ? 'text-success' : 'text-warning'}`}>{int.status}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Danger Zone */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-bg-secondary border border-danger/20 rounded-card p-6">
        <h3 className="text-sm font-medium text-danger mb-2">Danger Zone</h3>
        <p className="text-xs text-txt-secondary mb-4">These actions cannot be undone</p>
        <button className="px-4 py-2 border border-danger/30 text-danger rounded-button text-sm hover:bg-danger/10 transition-colors">
          Clear All Data
        </button>
      </motion.div>
    </div>
  );
}
