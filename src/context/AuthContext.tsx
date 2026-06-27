import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@stratasphere.com.au': {
    password: 'admin123',
    user: {
      id: 'usr-001',
      email: 'admin@stratasphere.com.au',
      firstName: 'Admin',
      lastName: 'User',
      role: 'owner',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: '2023-01-01T00:00:00Z',
    },
  },
  'manager@stratasphere.com.au': {
    password: 'manager123',
    user: {
      id: 'usr-002',
      email: 'manager@stratasphere.com.au',
      firstName: 'Property',
      lastName: 'Manager',
      role: 'manager',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: '2023-01-01T00:00:00Z',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('stratasphere_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      } catch {
        sessionStorage.removeItem('stratasphere_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      const loggedInUser = { ...mockUser.user, lastLogin: new Date().toISOString() };
      setUser(loggedInUser);
      sessionStorage.setItem('stratasphere_auth', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('stratasphere_auth');
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'owner') return role === 'owner' || role === 'manager';
    return user.role === role;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
