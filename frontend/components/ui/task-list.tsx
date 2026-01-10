import * as React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Checkbox } from './checkbox';
import { Button } from './button';
import { MoreHorizontal, Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: string;
  category?: string;
}

interface TaskListProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[];
  onTaskToggle?: (id: string, completed: boolean) => void;
  onTaskEdit?: (id: string) => void;
  onTaskDelete?: (id: string) => void;
}

const TaskList = React.forwardRef<HTMLDivElement, TaskListProps>(
  ({ tasks, onTaskToggle, onTaskEdit, onTaskDelete, className, ...props }, ref) => {
    return (
      <Card className={className} ref={ref} {...props}>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {tasks.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">No tasks found</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) => onTaskToggle?.(task.id, Boolean(checked))}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`font-medium truncate ${task.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-foreground'}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              task.priority === 'high'
                                ? 'destructive'
                                : task.priority === 'medium'
                                  ? 'warning'
                                  : 'secondary'
                            }
                            size="sm"
                          >
                            {task.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onTaskEdit?.(task.id)}
                            className="h-6 w-6"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {task.description && (
                        <p className={`text-sm mt-1 text-neutral-600 dark:text-neutral-300 ${task.completed ? 'line-through' : ''}`}>
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.category && (
                          <div className="flex items-center gap-1">
                            <span className="capitalize">{task.category}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
TaskList.displayName = 'TaskList';

export { TaskList, type Task };