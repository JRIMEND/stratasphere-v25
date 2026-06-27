import { secureStore } from './store';
import type { User } from '@/types';

const AUTH_KEY = 'ss_auth';
const TOKEN_KEY = 'ss_token';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

function generateToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mockUsers: Record<string, { user: User }> = {
  'admin@stratasphere.com.au': {
    user: { id: '1', email: 'admin@stratasphere.com.au', firstName: 'Josh', lastName: 'Ryan', role: 'admin' }
  },
  'manager@stratasphere.com.au': {
    user: { id: '2', email: 'manager@stratasphere.com.au', firstName: 'Sarah', lastName: 'Chen', role: 'manager' }
  }
};

export const authStore = {
  login: (email: string, password: string): { success: boolean; user?: User; error?: string } => {
    const mock = mockUsers[email.toLowerCase()];
    if (!mock) return { success: false, error: 'Invalid credentials' };
    if (password === 'admin123' && email === 'admin@stratasphere.com.au') {
      const token = generateToken();
      secureStore.set(TOKEN_KEY, { token, expires: Date.now() + SESSION_TIMEOUT });
      secureStore.set(AUTH_KEY, { user: mock.user, loginTime: Date.now() });
      return { success: true, user: mock.user };
    }
    if (password === 'manager123' && email === 'manager@stratasphere.com.au') {
      const token = generateToken();
      secureStore.set(TOKEN_KEY, { token, expires: Date.now() + SESSION_TIMEOUT });
      secureStore.set(AUTH_KEY, { user: mock.user, loginTime: Date.now() });
      return { success: true, user: mock.user };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  logout: (): void => {
    secureStore.remove(AUTH_KEY);
    secureStore.remove(TOKEN_KEY);
  },

  getUser: (): User | null => {
    const data = secureStore.get(AUTH_KEY);
    if (!data?.user) return null;
    const tokenData = secureStore.get(TOKEN_KEY);
    if (!tokenData || tokenData.expires < Date.now()) {
      authStore.logout();
      return null;
    }
    return data.user;
  },

  isAuthenticated: (): boolean => authStore.getUser() !== null,

  hasRole: (roles: string[]): boolean => {
    const user = authStore.getUser();
    return user !== null && roles.includes(user.role);
  }
};
