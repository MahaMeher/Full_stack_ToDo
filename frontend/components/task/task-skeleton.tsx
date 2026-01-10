import { Card } from '@/components/ui/card';

export function TaskSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-4 w-4 rounded bg-muted-foreground/20 mt-1"></div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted-foreground/20 rounded w-1/3"></div>
          </div>

          <div className="mt-2 space-y-1">
            <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="h-2 bg-muted-foreground/20 rounded w-1/4"></div>
            <div className="h-2 bg-muted-foreground/20 rounded w-1/4"></div>
          </div>
        </div>

        <div className="flex gap-1">
          <div className="h-8 w-16 rounded-md bg-muted-foreground/20"></div>
          <div className="h-8 w-16 rounded-md bg-muted-foreground/20"></div>
        </div>
      </div>
    </div>
  );
}

export function TaskListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  );
}