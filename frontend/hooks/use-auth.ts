import { useState, useEffect } from 'react';
import { UserSession } from '@/types/user';
import { getSession, signIn, signUp, signOut } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage or cookies
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          const userSession: UserSession = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            themePreference: 'system',
            isAuthenticated: true,
            jwtToken: session.jwtToken,
          };
          setUser(userSession);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.user) {
        const userSession: UserSession = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          themePreference: 'system',
          isAuthenticated: true,
          jwtToken: result.user.jwtToken || '',
        };

        setUser(userSession);
        return { success: true, user: userSession };
      } else {
        return { success: false, error: result.error?.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signUp(name, email, password);
      if (result.user) {
        const userSession: UserSession = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          themePreference: 'system',
          isAuthenticated: true,
          jwtToken: result.user.jwtToken || '',
        };

        setUser(userSession);
        return { success: true, user: userSession };
      } else {
        return { success: false, error: result.error?.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login, logout, register };
}