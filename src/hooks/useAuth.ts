import { useState, useEffect, useCallback } from 'react';
import { authStore } from '@/data/authStore';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authStore.getUser());
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = authStore.login(email, password);
    if (result.success) setUser(result.user!);
    return result;
  }, []);

  const logout = useCallback(() => {
    authStore.logout();
    setUser(null);
  }, []);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
