'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // If true, redirects to login when not authenticated
  redirectTo?: string; // Where to redirect when guard condition is met
}

export function AuthGuard({ children, requireAuth = true, redirectTo = '/sign-in' }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user?.isAuthenticated) {
        router.replace(redirectTo);
      } else if (!requireAuth && user?.isAuthenticated) {
        router.replace('/dashboard'); // Redirect authenticated users away from auth pages
      }
    }
  }, [user, loading, requireAuth, redirectTo, router]);

  // Show loading state while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" role="status" aria-live="polite">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Only render children if auth condition is satisfied
  if ((requireAuth && user?.isAuthenticated) || (!requireAuth && !user?.isAuthenticated)) {
    return <>{children}</>;
  }

  // Otherwise, show nothing while redirecting
  return null;
}