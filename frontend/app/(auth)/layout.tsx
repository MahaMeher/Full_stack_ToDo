import { Card } from '@/components/ui/card';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        {children}
      </Card>
    </div>
  );
}