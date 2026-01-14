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
    <div className={`border rounded-lg p-5 transition-all duration-300 ease-in-out transform hover:shadow-md ${
      task.completed ? 'bg-muted/20 opacity-70 grayscale' : 'bg-card'
    }`}>
      <div className="flex items-start gap-4">
        <div className="relative">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="absolute opacity-0 w-6 h-6 cursor-pointer z-10"
            aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div
            className={`relative w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
              ${task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
            onClick={toggleComplete}
          >
            {task.completed && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-bold transition-all duration-300 ${
              task.completed
                ? 'line-through text-muted-foreground/60 opacity-70'
                : 'text-foreground'
            }`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={`mt-2 text-base transition-all duration-300 ${
              task.completed ? 'text-muted-foreground/60' : 'text-muted-foreground'
            }`}>
              {task.description}
            </p>
          )}

          <div className={`mt-3 flex items-center justify-between text-xs transition-all duration-300 ${
            task.completed ? 'text-muted-foreground/50' : 'text-muted-foreground/70'
          }`}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Created: {formatDate(task.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated: {formatDate(task.updatedAt)}
            </span>
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