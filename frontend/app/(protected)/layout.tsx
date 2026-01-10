'use client';

import { AuthGuard } from '@/components/auth/auth-guard';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </AuthGuard>
  );
}