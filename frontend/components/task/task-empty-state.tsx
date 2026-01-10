import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskEmptyStateProps {
  onAddTask: () => void;
}

export function TaskEmptyState({ onAddTask }: TaskEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold mb-2">No tasks yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Get started by creating your first task. Organize your work and boost your productivity.
      </p>

      <Button onClick={onAddTask} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Your First Task
      </Button>
    </div>
  );
}