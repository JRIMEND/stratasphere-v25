import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    setError('');
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLocked(true);
        setError('Too many failed attempts. Account locked for 5 minutes.');
        setTimeout(() => { setLocked(false); setAttempts(0); setError(''); }, 5 * 60 * 1000);
      } else {
        setError(result.error || 'Invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <div className="hidden lg:flex lg:w-1/2 bg-bg-secondary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute text-accent font-mono text-xs"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${8 + Math.random() * 12}px`, opacity: 0.3 + Math.random() * 0.7 }}>
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
        <div className="relative z-10 text-center p-12">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-6">
              <Box className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display text-4xl tracking-wider text-accent mb-2">STRATASPHERE</h1>
            <p className="text-txt-secondary text-sm mb-8">Volumetric Property Management Platform</p>
            <div className="flex items-center justify-center gap-6 text-xs text-txt-tertiary">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> AES-256 Encrypted</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> PBKDF2 Auth</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
              <Box className="w-6 h-6 text-accent" />
            </div>
            <h1 className="font-display text-2xl tracking-wider text-accent">STRATASPHERE</h1>
          </div>

          <h2 className="text-xl font-heading font-medium text-txt-primary mb-1">Welcome back</h2>
          <p className="text-sm text-txt-secondary mb-6">Sign in to your account</p>

          {error && (
            <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-txt-secondary mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-tertiary border border-white/[0.06] rounded-input text-sm text-txt-primary placeholder-txt-tertiary outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="admin@stratasphere.com.au" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-txt-secondary mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 bg-bg-tertiary border border-white/[0.06] rounded-input text-sm text-txt-primary placeholder-txt-tertiary outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="Enter password" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-tertiary hover:text-txt-secondary">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={locked}
              className="w-full py-2.5 bg-accent text-bg-primary rounded-button font-medium text-sm hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {locked ? 'Account Locked' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-bg-tertiary/50 border border-white/[0.06] rounded-lg">
            <p className="text-[11px] text-txt-tertiary mb-2">Demo credentials:</p>
            <div className="text-xs font-mono text-txt-secondary space-y-1">
              <p>admin@stratasphere.com.au / admin123</p>
              <p>manager@stratasphere.com.au / manager123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
