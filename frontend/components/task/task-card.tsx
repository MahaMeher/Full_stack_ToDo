'use client';

import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types/task';
import { formatDate } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCardComponent = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 ease-in-out transform hover:shadow-md ${
      task.completed ? 'bg-muted/30 opacity-75' : 'bg-card'
    }`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={toggleComplete}
          className="mt-1 transition-transform duration-200 hover:scale-110"
          aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium truncate transition-colors duration-200 ${
              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={`mt-1 text-sm text-muted-foreground transition-opacity duration-200 ${
              isExpanded ? '' : 'truncate max-w-xs'
            }`}>
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground transition-colors duration-200">
            <span>Created: {formatDate(task.createdAt)}</span>
            <span>Updated: {formatDate(task.updatedAt)}</span>
          </div>
        </div>

        <div className="flex gap-1 transition-opacity duration-200">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="transition-all duration-200 hover:scale-105"
            aria-label="Edit task"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="transition-all duration-200 hover:scale-105 hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Delete task"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export const TaskCard = memo(TaskCardComponent);